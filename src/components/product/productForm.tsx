'use client';

import { ProductFormData, ProductFormProps } from "@/src/types/type";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup';
import { Controller, useForm, useFieldArray } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createProduct } from "@/src/services/product";
import { getCategoriesList, createCategory } from "@/src/services/category"; 
import { useState, useEffect } from 'react';
import { TCategory } from "@/src/services/category/category.type";
import { ImageUpload } from "@/src/services/imageUpload";
import { MinusCircle, PlusCircle, Upload, X } from "lucide-react";
import { ImageUploadResponse } from "@/src/services/imageUpload/imageUpload.type";

const productSchema = yup.object({
    name: yup.string().required('Product name is required'),
    price: yup.number().positive('Price must be positive').required('Price is required'),
    categoryId: yup.string().required('Category is required'),
    subCategoryId: yup.string().required('Subcategory is required'),
    descriptions: yup.string().required('Description is required'),
    image: yup.string().required('Image URL is required'),
    variations: yup.array().of(
        yup.object().shape({
            value: yup.string().required('Variation value is required'),
            type: yup.string().required('Variation type is required')
        })
    )
}).required();

export const ProductForm = ({ product, onCancel }: ProductFormProps) => {
    const { control, handleSubmit, formState: { errors }, watch, setValue, reset } = useForm<ProductFormData>({
        resolver: yupResolver(productSchema),
        defaultValues: product || { 
            name: '', 
            price: 0, 
            categoryId: '', 
            subCategoryId: '', 
            descriptions: '', 
            image: '', 
            variations: [{ value: '', type: '' }] 
        },
    });

    const queryClient = useQueryClient();
    const { fields, append, remove } = useFieldArray({ control, name: "variations" });
    const [subCategories, setSubCategories] = useState<TCategory[]>([]);
    const [showNewCategoryForm, setShowNewCategoryForm] = useState(false);
    const [showNewSubCategoryForm, setShowNewSubCategoryForm] = useState(false);
    const [newCategory, setNewCategory] = useState({ name: ''});
    const [newSubCategory, setNewSubCategory] = useState({ name: '', parentId: '' });
    const [previewImage, setPreviewImage] = useState<string | null>(null);

    const { data: parentCategories } = useQuery({
        queryKey: ['parentCategories'],
        queryFn: () => getCategoriesList({ showOnlyParent: 1 }),
    });

    const selectedCategoryId = watch('categoryId');

    const fetchSubCategories = async (categoryId: string) => {
        if (categoryId) {
            const response = await getCategoriesList({ parentId: categoryId });

            if (response.success) {
                setSubCategories(response.data);
            }
        } else {
            setSubCategories([]);
        }
    };

    useEffect(() => {
        fetchSubCategories(selectedCategoryId);
    }, [selectedCategoryId]);

    const createCategoryMutation = useMutation({
        mutationKey: ['createCategory'],
        mutationFn: createCategory,
        onSuccess: () => {
            alert('New category created successfully');
            setShowNewCategoryForm(false);
            setNewCategory({ name: ''});
            queryClient.invalidateQueries({ queryKey: ['parentCategories'] });
        },
        onError: (error: Error) => {
            alert(`Error: ${error.message}`);
        }
    });

    const createSubCategoryMutation = useMutation({
        mutationKey: ['createSubCategory'],
        mutationFn: createCategory,
        onSuccess: async () => {
            alert('New subcategory created successfully');
            setShowNewSubCategoryForm(false);
            setNewSubCategory({ name: '', parentId: '' });
            // Refetch subcategories after successful creation
            await fetchSubCategories(selectedCategoryId);
        },
        onError: (error: Error) => {
            alert(`Error: ${error.message}`);
        }
    });

    const addProduct = useMutation({
        mutationKey: ['createProduct'],
        mutationFn: createProduct,
        onSuccess: () => {
            alert("Product created successfully!");
            reset();
            setPreviewImage(null);
            queryClient.invalidateQueries({ queryKey: ['products'] });
        },
        onError: (error) => {
            alert(`Error: ${error.message}`);
        }
    });

    const uploadImage = useMutation({
        mutationKey: ['uploadImage'],
        mutationFn: ImageUpload,
        onSuccess: (data:ImageUploadResponse) => {
            alert("Image uploaded successfully!");
            setValue('image', data.data.url);
            setPreviewImage(data.data.url);
        },
        onError: (error) => {
            alert(`Error: ${error.message}`);
        }
    });

    const onSubmit = async (data: ProductFormData) => {
        await addProduct.mutateAsync(data);
    };

    const handleCreateCategory = () => {
        createCategoryMutation.mutateAsync(newCategory);
    };

    const handleCreateSubCategory = () => {
        if (selectedCategoryId) {
            createSubCategoryMutation.mutateAsync({ ...newSubCategory, parentId: selectedCategoryId });
        }
    };

    const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            try {
                await uploadImage.mutateAsync(file);
            } catch (error) {
                const errorMessage = error instanceof Error ? error.message : 'Unknown error';
                alert(`Image upload failed: ${errorMessage}`);
            }
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 bg-white shadow-xl rounded-lg p-8 max-w-4xl mx-auto">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {/* Product Name */}
                <div className="col-span-2 sm:col-span-1">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                    <Controller
                        name="name"
                        control={control}
                        render={({ field }) => (
                            <input
                                id="name"
                                type="text"
                                {...field}
                                className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            />
                        )}
                    />
                    {errors.name && <p className="mt-1 text-red-500 text-xs">{errors.name.message}</p>}
                </div>

                {/* Price */}
                <div className="col-span-2 sm:col-span-1">
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                    <Controller
                        name="price"
                        control={control}
                        render={({ field }) => (
                            <input
                                id="price"
                                type="number"
                                {...field}
                                className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            />
                        )}
                    />
                    {errors.price && <p className="mt-1 text-red-500 text-xs">{errors.price.message}</p>}
                </div>

                {/* Category and Subcategory */}
                <div className="col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="categoryId" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                        <div className="flex items-center space-x-2">
                            <Controller
                                name="categoryId"
                                control={control}
                                render={({ field }) => (
                                    <select
                                        {...field}
                                        className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    >
                                        <option value="">Select</option>
                                        {parentCategories?.data?.map((category) => (
                                            <option key={category._id} value={category._id}>{category.name}</option>
                                        ))}
                                    </select>
                                )}
                            />
                            <button 
                                type="button" 
                                onClick={() => setShowNewCategoryForm(!showNewCategoryForm)}
                                className="inline-flex items-center p-2 border border-transparent rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            >
                                {showNewCategoryForm ? <X size={20} /> : <PlusCircle size={20} />}
                            </button>
                        </div>
                        {errors.categoryId && <p className="mt-1 text-red-500 text-xs">{errors.categoryId.message}</p>}
                    </div>
                    <div>
                        <label htmlFor="subCategoryId" className="block text-sm font-medium text-gray-700 mb-1">Subcategory</label>
                        <div className="flex items-center space-x-2">
                            <Controller
                                name="subCategoryId"
                                control={control}
                                render={({ field }) => (
                                    <select
                                        {...field}
                                        className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                        disabled={!selectedCategoryId}
                                    >
                                        <option value="">Select</option>
                                        {subCategories.map((subCategory) => (
                                            <option key={subCategory._id} value={subCategory._id}>{subCategory.name}</option>
                                        ))}
                                    </select>
                                )}
                            />
                            <button 
                                type="button" 
                                onClick={() => setShowNewSubCategoryForm(!showNewSubCategoryForm)}
                                className="inline-flex items-center p-2 border border-transparent rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2  focus:ring-indigo-500"
                                disabled={!selectedCategoryId}
                            >
                                {showNewSubCategoryForm ? <X size={20} /> : <PlusCircle size={20} />}
                            </button>
                        </div>
                        {errors.subCategoryId && <p className="mt-1 text-red-500 text-xs">{errors.subCategoryId.message}</p>}
                    </div>
                </div>

                {/* New Category Form */}
                {showNewCategoryForm && (
                    <div className="col-span-2 bg-gray-50 p-4 rounded-md shadow-inner">
                        <h3 className="text-lg font-medium text-gray-900 mb-2">New Category</h3>
                        <input
                            type="text"
                            value={newCategory.name}
                            onChange={(e) => setNewCategory({ name: e.target.value })}
                            placeholder="New Category Name"
                            className="mt-1 p-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                        <button
                            type="button"
                            onClick={handleCreateCategory}
                            className="mt-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Create Category
                        </button>
                    </div>
                )}

                {/* New Subcategory Form */}
                {showNewSubCategoryForm && (
                    <div className="col-span-2 bg-gray-50 p-4 rounded-md shadow-inner">
                        <h3 className="text-lg font-medium text-gray-900 mb-2">New Subcategory</h3>
                        <input
                            type="text"
                            value={newSubCategory.name}
                            onChange={(e) => setNewSubCategory({ ...newSubCategory, name: e.target.value })}
                            placeholder="New Subcategory Name"
                            className="mt-1 p-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                        <button
                            type="button"
                            onClick={handleCreateSubCategory}
                            className="mt-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Create Subcategory
                        </button>
                    </div>
                )}

                {/* Description */}
                <div className="col-span-2">
                    <label htmlFor="descriptions" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <Controller
                        name="descriptions"
                        control={control}
                        render={({ field }) => (
                            <textarea
                                id="descriptions"
                                {...field}
                                rows={4}
                                className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            />
                        )}
                    />
                    {errors.descriptions && <p className="mt-1 text-red-500 text-xs">{errors.descriptions.message}</p>}
                </div>

                {/* Image Upload */}
                <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Product Image</label>
                    <div className="mt-1 flex items-center space-x-4">
                        <Controller
                            name="image"
                            control={control}
                            render={({ field }) => (
                                <input
                                    type="text"
                                    {...field}
                                    className="hidden"
                                />
                            )}
                        />
                        <div className="flex-shrink-0">
                            <label htmlFor="file-upload" className="cursor-pointer inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                <Upload className="mr-2 h-5 w-5" />
                                Upload Image
                            </label>
                            <input
                                id="file-upload"
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="sr-only"
                            />
                        </div>
                        {previewImage && (
                            <div className="relative">
                                <img src={previewImage} alt="Preview" className="h-20 w-20 object-cover rounded-md border-2 border-gray-300" />
                                <button
                                    type="button"
                                    onClick={() => {
                                        setPreviewImage(null);
                                        setValue('image', '');
                                    }}
                                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                >
                                    <X size={16} />
                                </button>
                            </div>
                        )}
                    </div>
                    {errors.image && <p className="mt-1 text-red-500 text-xs">{errors.image.message}</p>}
                </div>
            </div>

            {/* Variations */}
            <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Variations</label>
                {fields.map((item, index) => (
                    <div key={item.id} className="flex items-center space-x-4 mb-2">
                        <Controller
                            name={`variations.${index}.value`}
                            control={control}
                            render={({ field }) => (
                                <input
                                    type="text"
                                    {...field}
                                    placeholder="Variation value"
                                    className="block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                            )}
                        />
                        <Controller
                            name={`variations.${index}.type`}
                            control={control}
                            render={({ field }) => (
                                <input
                                    type="text"
                                    {...field}
                                    placeholder="Variation type"
                                    className="block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                            )}
                        />
                        <button
                            type="button"
                            onClick={() => remove(index)}
                            className="inline-flex items-center p-2 border border-transparent rounded-full shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        >
                            <MinusCircle size={20} />
                        </button>
                    </div>
                ))}
                <button
                    type="button"
                    onClick={() => append({ value: '', type: '' })}
                    className="mt-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    <PlusCircle className="mr-2 h-5 w-5" />
                    Add Variation
                </button>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end space-x-4 mt-8">
                <button 
                    type="button" 
                    onClick={onCancel} 
                    className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Cancel
                </button>
                <button 
                    type="submit" 
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Submit Product
                </button>
            </div>
        </form>
    );
};