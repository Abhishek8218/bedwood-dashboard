import { Api } from "../config";

const path = "/order";

export const getOrders = async (page:number) => {
    return (await Api.get(path + "/list?page=" + page)).data;
    }


    export const updateOrderStatus = async (data: { orderId: string; status: string }) => {
        return (await Api.post(path + "/update-status", data)).data;
    }

    export const orderDetails = async (id: string) => {
        return (await Api.get(path + "/details/" + id)).data;
    }





