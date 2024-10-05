import { Api } from "../config";
import { ProductResponse, TProduct } from "./product.type";

const path = "/product";

// Function to create a product
export const createProduct = async (data: Partial<TProduct>): Promise<TProduct> => {
  return (await Api.post(path + "/save", data)).data;
};

export const getProductsList = async (): Promise<ProductResponse> => {
    return (await Api.get(path + "/list")).data;
    }


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
