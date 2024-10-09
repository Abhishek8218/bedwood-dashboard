import { Api } from "../config";
import { AllCategoryApiResponse, TCategory, TCategoryApiResponse, TCreateCategory, TDeleteCategory, TUpdateCategory } from "./category.type";

const path = "/category";

// Function to create a new category
export const createCategory = async (data: Partial<TCategory>): Promise<TCreateCategory> => {
    return (await Api.post(path + "/save", data)).data;
};

// Function to fetch categories with optional filters for `showOnlyParent` and `parentId`
export const getCategoriesList = async ({ showOnlyParent, parentId }: { showOnlyParent?: number, parentId?: string }): Promise<TCategoryApiResponse> => {
    // Construct query parameters based on available filters
    const params: Record<string, string | number> = {};
    if (showOnlyParent !== undefined) params.showOnlyParent = showOnlyParent;
    if (parentId) params.parentId = parentId;

    // Perform API call with query parameters
    return (await Api.get(path + "/list", { params })).data;
};



export const getAllCategory = async (): Promise<AllCategoryApiResponse> => {  
    return (await Api.get(path + "/list-all")).data;
}


export const deleteCategory = async (ids: Partial<TDeleteCategory>): Promise<TDeleteCategory> => {
    return (await Api.post(path + "/delete" ,ids)).data;
}


export const updateCategory = async (data: Partial<TUpdateCategory>): Promise<TUpdateCategory> => {
    // Check for ID to update the existing category
    if (data._id || data.parentId) {
      return (await Api.post(path + "/save", data)).data;
    } else {
        console.log(data)
        console.log("clciked")
      // If no ID or parentId is provided, it's treated as a new entry
      throw new Error('Category ID or Parent ID is required to update the existing category.');
    }
  };