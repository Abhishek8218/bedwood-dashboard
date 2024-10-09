import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAllCategory, updateCategory, deleteCategory, createCategory } from "@/src/services/category";
import { Trash2, Image as ImageIcon, ChevronRight, Plus, Upload, Edit } from "lucide-react";
import { AllCategoryApiResponse, DataItem, ISubCategory } from "@/src/services/category/category.type";
import { ImageUpload } from "@/src/services/imageUpload";


interface CategoryDetailsModalProps {
  category: DataItem;
  onClose: () => void;
  onDelete: (id: string) => void;
  onSubCategoryDelete: (subCategoryId: string) => void;
  onSubCategoryToggle: (categoryId: string, subCategoryId: string, newStatus: boolean, name: string, image: string | undefined, children: ISubCategory[]) => void;
  onAddSubCategory: (categoryId: string) => void;
  onEditCategory: (category: DataItem) => void;
  onEditSubCategory: (categoryId: string, subCategory: ISubCategory) => void;
}

const CategoryDetailsModal = ({ 
  category, 
  onClose, 
  onDelete, 
  onSubCategoryDelete, 
  onSubCategoryToggle, 
  onAddSubCategory,
  onEditCategory,
  onEditSubCategory
}: CategoryDetailsModalProps) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-md max-h-[90vh] overflow-y-auto">
        <h3 className="text-xl font-semibold border-b pb-2 mb-4">Category Details</h3>
        <div className="mt-2">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="font-medium">Category Name:</p>
              <p>{category.label}</p>
            </div>
            <div>
              <p className="font-medium">Status:</p>
              <p className={`${category.status ? 'text-green-600' : 'text-red-600'}`}>
                {category.status ? 'Active' : 'Inactive'}
              </p>
            </div>
            {category.image && (
              <div className="col-span-2">
                <p className="font-medium">Image:</p>
                <img src={category.image} alt={category.label} className="w-full h-32 object-cover rounded mt-2" />
              </div>
            )}
          </div>
          <div className="mt-4">
            <div className="flex justify-between items-center mb-2">
              <p className="font-medium">Sub-categories:</p>
              <button
                onClick={() => onAddSubCategory(category.value)}
                className="inline-flex items-center px-2 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <Plus className="h-4 w-4 mr-1" /> Add Subcategory
              </button>
            </div>
            {category.children && category.children.length > 0 ? (
              <ul className="space-y-2">
                {category.children.map((subCat) => (
                  <li key={subCat._id} className="flex items-center justify-between bg-gray-100 p-2 rounded">
                    <span>{subCat.label}</span>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => onSubCategoryToggle(category.value, subCat.value, !subCat.status, category.label, category.image, category.children)}
                        className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                          subCat.status ? 'bg-indigo-600' : 'bg-gray-200'
                        }`}
                      >
                        <span
                          className={`inline-block h-5 w-5 transform rounded-full bg-white transition duration-200 ease-in-out ${
                            subCat.status ? 'translate-x-5' : 'translate-x-0'
                          }`}
                        />
                      </button>
                      <button
                        onClick={() => onEditSubCategory(category.value, subCat)}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => onSubCategoryDelete(subCat.value)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 italic">No subcategories yet.</p>
            )}
          </div>
        </div>
        <div className="mt-6 flex justify-between">
          <button
            onClick={() => onDelete(category.value)}
            className="bg-red-500 text-white px-4 py-2 min-w-[102px] rounded hover:bg-red-600 transition duration-300 flex items-center"
          >
            <Trash2 className="mr-2 h-4 w-4" /> Delete
          </button>
          <button
            onClick={() => onEditCategory(category)}
            className="bg-blue-500 text-white px-4 py-2  min-w-[102px]  rounded hover:bg-blue-600 transition duration-300 flex items-center mr-2"
          >
            <Edit className="mr-2 h-4 w-4" /> Edit
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-800 px-4 py-2  min-w-[102px]  rounded hover:bg-gray-400 transition duration-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};



interface AddCategoryModalProps {
    onClose: () => void;
    onSubmit: (categoryData: { name: string; image?: string }) => void;
  }
  
  const AddCategoryModal = ({ onClose, onSubmit }: AddCategoryModalProps) => {
      const [name, setName] = useState("");
      const [image, setImage] = useState<File | null>(null);
      const [previewUrl, setPreviewUrl] = useState<string | null>(null);
      const [isUploading, setIsUploading] = useState(false);
    
      const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
          setImage(file);
          setPreviewUrl(URL.createObjectURL(file));
        }
      };
    
      const uploadImageMutation = useMutation({
        mutationFn: ImageUpload,
        onSuccess: (data) => {
          onSubmit({ name, image: data.data.url });
          onClose();
        },
        onError: (error) => {
          console.error("Error uploading image:", error);
          // Handle error (e.g., show error message to user)
        },
        onSettled: () => {
          setIsUploading(false);
        },
      });
    
      const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (image) {
          setIsUploading(true);
          // const formData = new FormData();
          // formData.append('image', image);
          uploadImageMutation.mutate(image);
        } else {
          onSubmit({ name });
          onClose();
        }
      };
    
      return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-md">
            <h3 className="text-xl font-semibold border-b pb-2 mb-4">Add New Category</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Category Name</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  required
                />
              </div>
              <div>
                <label htmlFor="image" className="block text-sm font-medium text-gray-700">Category Image</label>
                <div className="mt-1 flex items-center">
                  <input
                    type="file"
                    id="image"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="sr-only"
                  />
                  <label
                    htmlFor="image"
                    className="cursor-pointer bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <Upload className="h-5 w-5 inline-block mr-2" />
                    Upload Image
                  </label>
                  {previewUrl && (
                    <img src={previewUrl} alt="Preview" className="ml-3 h-16 w-16 object-cover rounded-md" />
                  )}
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUploading}
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                >
                  {isUploading ? 'Uploading...' : 'Create Category'}
                </button>
              </div>
            </form>
          </div>
        </div>
      );
    };
  
  interface AddSubcategoryModalProps {
    categoryId: string;
    onClose: () => void;
    onSubmit: (subcategoryData: { name: string; parentId: string }) => void;
  }
  
  const AddSubcategoryModal = ({ categoryId, onClose, onSubmit }: AddSubcategoryModalProps) => {
    const [name, setName] = useState("");
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onSubmit({ name, parentId: categoryId });
      onClose();
    };
  
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-md">
          <h3 className="text-xl font-semibold border-b pb-2 mb-4">Add New Subcategory</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Subcategory Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                required
              />
            </div>
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Create Subcategory
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };
  













interface EditCategoryModalProps {
  category: DataItem;
  onClose: () => void;
  onSubmit: (categoryData: { _id: string; name: string; image?: string; status: boolean }) => void;
}

const EditCategoryModal = ({ category, onClose, onSubmit }: EditCategoryModalProps) => {
  const [name, setName] = useState(category.label);
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(category.image || null);
  const [status, setStatus] = useState(category.status);
  const [isUploading, setIsUploading] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const uploadImageMutation = useMutation({
    mutationFn: ImageUpload,
    onSuccess: (data) => {
      onSubmit({ _id: category.value, name, image: data.data.url, status });
      onClose();
    },
    onError: (error) => {
      console.error("Error uploading image:", error);
    },
    onSettled: () => {
      setIsUploading(false);
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (image) {
      setIsUploading(true);
      uploadImageMutation.mutate(image);
    } else {
      onSubmit({ _id: category.value, name, image: category.image, status });
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-md">
        <h3 className="text-xl font-semibold border-b pb-2 mb-4">Edit Category</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Category Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700">Category Image</label>
            <div className="mt-1 flex items-center">
              <input
                type="file"
                id="image"
                accept="image/*"
                onChange={handleImageChange}
                className="sr-only"
              />
              <label
                htmlFor="image"
                className="cursor-pointer bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <Upload className="h-5 w-5 inline-block mr-2" />
                Upload Image
              </label>
              {previewUrl && (
                <img src={previewUrl} alt="Preview" className="ml-3 h-16 w-16 object-cover rounded-md" />
              )}
            </div>
          </div>
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
            <div className="mt-1">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  checked={status}
                  onChange={(e) => setStatus(e.target.checked)}
                  className="form-checkbox h-5 w-5 text-indigo-600"
                />
                <span className="ml-2">Active</span>
              </label>
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isUploading}
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {isUploading ? 'Uploading...' : 'Update Category'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

interface EditSubcategoryModalProps {
  parentId: string;
  subCategory: ISubCategory;
  onClose: () => void;
  onSubmit: (subcategoryData: { parentId: string; subCategoryId: string; name: string; status: boolean }) => void;
}

const EditSubcategoryModal = ({ parentId, subCategory, onClose, onSubmit }: EditSubcategoryModalProps) => {
  const [name, setName] = useState(subCategory.label);
  const [status, setStatus] = useState(subCategory.status || false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ parentId:parentId, subCategoryId: subCategory.value, name, status });
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-md">
        <h3 className="text-xl font-semibold border-b pb-2 mb-4">Edit Subcategory</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Subcategory Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
            <div className="mt-1">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  checked={status}
                  onChange={(e) => setStatus(e.target.checked)}
                  className="form-checkbox h-5 w-5 text-indigo-600"
                />
                <span className="ml-2">Active</span>
              </label>
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2  focus:ring-indigo-500"
            >
              Update Subcategory
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export const CategoryList = () => {
  const queryClient = useQueryClient();
  const [selectedCategory, setSelectedCategory] = useState<DataItem | null>(null);
  const [isAddCategoryModalOpen, setIsAddCategoryModalOpen] = useState(false);
  const [isAddSubcategoryModalOpen, setIsAddSubcategoryModalOpen] = useState(false);
  const [isEditCategoryModalOpen, setIsEditCategoryModalOpen] = useState(false);
  const [isEditSubcategoryModalOpen, setIsEditSubcategoryModalOpen] = useState(false);
  const [categoryToEdit, setCategoryToEdit] = useState<DataItem | null>(null);
  const [subcategoryToEdit, setSubcategoryToEdit] = useState<{ categoryId: string; subCategory: ISubCategory } | null>(null);
  const [newCategoryId, setNewCategoryId] = useState<string | null>(null);

  const { data: categoriesData, isLoading, error } = useQuery<AllCategoryApiResponse>({
    queryKey: ['categories'],
    queryFn: getAllCategory,
  });

  const updateCategoryMutation = useMutation({
    mutationFn: updateCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      setSelectedCategory(null);
    },
  });

  const deleteCategoryMutation = useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      setSelectedCategory(null);
    },
  });

  const createCategoryMutation = useMutation({
    mutationFn: createCategory,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      setSelectedCategory(null);
      if (data.data?._id) {
        setNewCategoryId(data.data?._id);
      }
    },
  });

  const handleStatusToggle = (id: string, currentStatus: boolean, label: string, image: string | undefined, children: ISubCategory[]) => {
    updateCategoryMutation.mutate({ _id: id, status: !currentStatus, name: label, image: image, children: children });
  };

  const handleSubCategoryToggle = (categoryId: string, subCategoryId: string, newStatus: boolean, label: string, image: string | undefined, children: ISubCategory[]) => {
    updateCategoryMutation.mutate({ _id: subCategoryId, parentId: categoryId, status: newStatus, name: label, image: image, children: children });
  };

  const handleRowClick = (category: DataItem) => {
    setSelectedCategory(category);
  };

  const handleDeleteCategory = (id: string) => {
    deleteCategoryMutation.mutate({ ids: id });
  };

  const handleDeleteSubCategory = (id: string) => {
    deleteCategoryMutation.mutate({ ids: id });
  };

  const handleAddCategory = (categoryData: { name: string; image?: string }) => {
    createCategoryMutation.mutate({
      name: categoryData.name,
      image: categoryData.image,
    });
  };

  const handleAddSubCategory = (subcategoryData: { parentId: string; name: string }) => {
    createCategoryMutation.mutate({
      name: subcategoryData.name,
      parentId: subcategoryData.parentId,
    });
  };

  const handleEditCategory = (category: DataItem) => {
    setCategoryToEdit(category);
    setIsEditCategoryModalOpen(true);
  };

  const handleEditSubCategory = (categoryId: string, subCategory: ISubCategory) => {
    setSubcategoryToEdit({ categoryId, subCategory });
    setIsEditSubcategoryModalOpen(true);
  };

  const handleUpdateCategory = (categoryData: { _id: string; name: string; image?: string; status: boolean }) => {
    updateCategoryMutation.mutate(categoryData);
  };

  const handleUpdateSubcategory = (subcategoryData: { parentId: string; subCategoryId: string; name: string; status: boolean }) => {
    updateCategoryMutation.mutate({
      _id: subcategoryData.subCategoryId,
      parentId: subcategoryData.parentId,
      name: subcategoryData.name,
      status: subcategoryData.status,
    });
  };

  if (isLoading) return <div className="flex justify-center items-center h-64">Loading...</div>;
  if (error) return <div className="text-red-500 text-center">Error fetching categories: {error.message}</div>;

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="px-4 py-5 sm:px-6 flex justify-between items-center border-b border-gray-200">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Categories</h3>
        <button
          onClick={() => setIsAddCategoryModalOpen(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <Plus className="h-5 w-5 mr-2" /> Add Category
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sub-categories</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {categoriesData?.data.map((category) => (
              <tr key={category._id} onClick={() => handleRowClick(category)} className="cursor-pointer hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">{category.label}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {category.image ? (
                    <img src={category.image} alt={category.label} className="h-10 w-10 rounded-full object-cover" />
                  ) : (
                    <ImageIcon className="h-10 w-10 text-gray-300" />
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleStatusToggle(category.value, category.status, category.label, category.image, category.children);
                    }}
                    className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                      category.status ? 'bg-indigo-600' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-5 w-5 transform rounded-full bg-white transition duration-200 ease-in-out ${
                        category.status ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap flex items-center">
                  <span>{category?.children?.length || 0} sub-categories</span>
                  <ChevronRight className="ml-2 h-4 w-4 text-gray-400" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selectedCategory && (
        <CategoryDetailsModal
          category={selectedCategory}
          onClose={() => setSelectedCategory(null)}
          onDelete={handleDeleteCategory}
          onSubCategoryDelete={handleDeleteSubCategory}
          onSubCategoryToggle={handleSubCategoryToggle}
          onAddSubCategory={(categoryId) => {
            setNewCategoryId(categoryId);
            setIsAddSubcategoryModalOpen(true);
          }}
          onEditCategory={handleEditCategory}
          onEditSubCategory={handleEditSubCategory}
        />
      )}

      {isAddCategoryModalOpen && (
        <AddCategoryModal
          onClose={() => setIsAddCategoryModalOpen(false)}
          onSubmit={handleAddCategory}
        />
      )}

      {isAddSubcategoryModalOpen && newCategoryId && (
        <AddSubcategoryModal
          categoryId={newCategoryId}
          onClose={() => {
            setIsAddSubcategoryModalOpen(false);
            setNewCategoryId(null);
          }}
          onSubmit={handleAddSubCategory}
        />
      )}

      {isEditCategoryModalOpen && categoryToEdit && (
        <EditCategoryModal
          category={categoryToEdit}
          onClose={() => {
            setIsEditCategoryModalOpen(false);
            setCategoryToEdit(null);
          }}
          onSubmit={handleUpdateCategory}
        />
      )}

      {isEditSubcategoryModalOpen && subcategoryToEdit && (
        <EditSubcategoryModal
          parentId={subcategoryToEdit.categoryId}
          subCategory={subcategoryToEdit.subCategory}
          onClose={() => {
            setIsEditSubcategoryModalOpen(false);
            setSubcategoryToEdit(null);
          }}
          onSubmit={handleUpdateSubcategory}
        />
      )}
    </div>
  );
};