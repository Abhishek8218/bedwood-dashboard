
export type TCategory  = {
   
   parentId?: string;
   _id?: string;
    name: string;
    success: boolean;
    message: string;
    image: string;
    status: boolean;
}


export type TCategoryApiResponse = {
    success: boolean;
    data: TCategory[];
    message: string;
};

export type TCreateCategory = {
    success: boolean;
    message: string;
    data: TCategory;
}


// Define the structure for individual children
export interface ISubCategory {
    _id: string;
    value: string;
    label: string;
    status?: boolean; // status is optional in children
    image?: string;   // image is optional in children
    children: ISubCategory[]; // recursively define children
  }
  
  // Define the structure for the main data objects
 export  interface DataItem {
    _id: string;
    value: string;
    label: string;
    status: boolean;
    image?: string;   // image is optional
    children: ISubCategory[]; // each DataItem can have children
  }
  
  // Define the structure for the response
  export interface AllCategoryApiResponse {
    success: boolean;
    message: string;
    data: DataItem[];  // Array of DataItem
    code: number;
  }
  

  export type TDeleteCategory = {
    ids: string;

  }

  export type TUpdateCategory = {
    parentId?: string;
    _id?: string;
     name: string;
     success: boolean;
     message: string;
     image: string;
     status: boolean;
     children: ISubCategory[];
  }
