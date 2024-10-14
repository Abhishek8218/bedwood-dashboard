import { Api } from "../config";

const path = "/order";

export const getOrders = async (page:number,status:string) => {
    let url = path + `/list?page=${page}`;
    
    // Append categoryId to the URL if it's available
    if (status) {
        url += `&status=${status}`;
    }
    
    return (await Api.get(url)).data;
};


    export const updateOrderStatus = async (data: { orderId: string; status: string }) => {
        return (await Api.post(path + "/update-status", data)).data;
    }

    export const orderDetails = async (id: string) => {
        return (await Api.get(path + "/details/" + id)).data;
    }





