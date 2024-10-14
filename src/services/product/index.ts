import { Api } from "../config";
import { ProductResponse, TProduct } from "./product.type";

const path = "/product";

// Function to create a product
export const createProduct = async (data: Partial<TProduct>): Promise<TProduct> => {
  return (await Api.post(path + "/save", data)).data;
};

export const getProductsList = async (page: number, categoryId?: string): Promise<ProductResponse> => {
    let url = path + `/list?page=${page}`;
    
    // Append categoryId to the URL if it's available
    if (categoryId) {
        url += `&categoryId=${categoryId}`;
    }
    
    return (await Api.get(url)).data;
};


export const getProduct = async (id: string): Promise<TProduct> => {
    return (await Api.get(path + "/details/" + id)).data;
    }
export const deleteProduct = async (ids:string): Promise<TProduct> => {
    return (await Api.post(path + "/delete",{ ids },
        {
            headers: {
                'Content-Type': 'application/json', // Set the request content type to JSON
              }
        }
    )).data;
    }
