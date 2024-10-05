
export type TCategory  = {
   
   parentId?: string;
   _id?: string;
    name: string;
    success: boolean;
    message: string;
}


export type TCatgeoryApiResponse = {
    success: boolean;
    data: TCategory[];
    message: string;
};