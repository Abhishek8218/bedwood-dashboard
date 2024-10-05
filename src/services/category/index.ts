import { Api } from "../config";
import { TCategory, TCatgeoryApiResponse } from "./category.type";

const path = "/category";

// Function to create a new category
export const createCategory = async (data: Partial<TCategory>): Promise<TCategory> => {
    return (await Api.post(path + "/save", data)).data;
};

// Function to fetch categories with optional filters for `showOnlyParent` and `parentId`
export const getCategoriesList = async ({ showOnlyParent, parentId }: { showOnlyParent?: number, parentId?: string }): Promise<TCatgeoryApiResponse> => {
    // Construct query parameters based on available filters
    const params: Record<string, string | number> = {};
    if (showOnlyParent !== undefined) params.showOnlyParent = showOnlyParent;
    if (parentId) params.parentId = parentId;

    // Perform API call with query parameters
    return (await Api.get(path + "/list", { params })).data;
};
