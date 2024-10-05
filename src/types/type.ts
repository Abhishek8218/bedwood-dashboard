import { ChartData } from "chart.js"

export type Product = {
    id: string
    name: string
    price: number

    image: string
    category: string
    description: string

  }
  
  export type Order = {
    id: number
    customer: string
    product: string
    quantity: number
    total: number
    date: string
    status: string
  }
  
 export type Customer = {
    id: number
    name: string
    email: string
    orders: number
    spent: number
 
  }
  
  export type SalesData = ChartData<'line', number[], string>
  export type CategoryData = ChartData<'doughnut', number[], string>
  export type CustomerData = ChartData<'bar', number[], string>
  
  export type SidebarProps = {
    activeTab: string
    setActiveTab: (tab: string) => void
    isSidebarOpen: boolean
    setIsSidebarOpen: (isOpen: boolean) => void
  }
  
  export type ProductFormData = {
    name: string
    price: number
    categoryId: string
    variations?: { value: string; type: string }[] | undefined;
    subCategoryId: string
    descriptions: string
    image: string
  }
  
  export type ProductFormProps = {
    product?: Product
    onSubmit: (data: ProductFormData) => void
    onCancel: () => void
  }