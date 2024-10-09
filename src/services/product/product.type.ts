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
    categoryName: string;
    categoryId: string;
    subCategoryName?: string;
    subCategoryId?: string;
    image: (string | undefined)[];
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





