// interface IVariation {
//     value: string;
//     type: string;
//   }
  
  export type  TProduct  = {
    _id: string;
    status?: boolean;
    isDeleted?: boolean;
    variations?: { value: string; type: string }[] | undefined;
    name: string;
    categoryId: string;
    subCategoryId: string;
    image: string;
    descriptions?: string;
    price: number;
  }



  export type ProductResponse = {
    data: TProduct[]; // The array of products
    extra: {
      total: number; // Total number of products
      limit: number; // Items per page
    };
  }





