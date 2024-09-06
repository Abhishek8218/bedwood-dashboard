import { ChartData } from "chart.js"

export type Product = {
    id: number
    name: string
    price: number
    stock: number
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
    lastPurchase: string
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
    stock: number
    category: string
    description: string
  }
  
  export type ProductFormProps = {
    product?: Product
    onSubmit: (data: ProductFormData) => void
    onCancel: () => void
  }