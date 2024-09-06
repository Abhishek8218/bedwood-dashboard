// 'use client'

// import React, { useState,} from 'react'
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
// import { useForm, Controller } from 'react-hook-form'
// import { yupResolver } from '@hookform/resolvers/yup'
// import * as yup from 'yup'
// import { Line, Doughnut, Bar } from 'react-chartjs-2'
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   ArcElement,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
//   ChartData,
//   ChartOptions
// } from 'chart.js'
// import { BarChart3, Home, Package, ShoppingCart, Users, X, Menu, ChevronLeft, ChevronRight } from 'lucide-react'

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   ArcElement,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend
// )

// const queryClient = new QueryClient()

// // Type definitions
// type Product = {
//   id: number
//   name: string
//   price: number
//   stock: number
//   image: string
//   category: string
//   description: string
//   sku: string
//   weight: number
//   dimensions: string
// }

// type Order = {
//   id: number
//   customer: string
//   product: string
//   quantity: number
//   total: number
//   date: string
//   status: string
// }

// type Customer = {
//   id: number
//   name: string
//   email: string
//   orders: number
//   spent: number
//   lastPurchase: string
// }

// type SalesData = ChartData<'line', number[], string>
// type CategoryData = ChartData<'doughnut', number[], string>
// type CustomerData = ChartData<'bar', number[], string>

// // type SidebarProps = {
// //   activeTab: string
// //   setActiveTab: (tab: string) => void
// //   isSidebarOpen: boolean
// //   setIsSidebarOpen: (isOpen: boolean) => void
// // }

// type ProductFormData = {
//   name: string
//   price: number
//   stock: number
//   category: string
//   description: string
//   sku: string
//   weight: number
//   dimensions: string
// }

// type ProductFormProps = {
//   product?: Product
//   onSubmit: (data: ProductFormData) => void
//   onCancel: () => void
// }

// // Dummy data
// const salesData: SalesData = {
//   labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
//   datasets: [
//     {
//       label: 'Sales',
//       data: [12000, 19000, 3000, 5000, 2000, 3000, 20000, 3000, 5000, 6000, 23000, 45000],
//       borderColor: 'rgb(75, 192, 192)',
//       tension: 0.1
//     }
//   ]
// }

// const categoryData: CategoryData = {
//   labels: ['Electronics', 'Clothing', 'Books', 'Home & Garden', 'Toys'],
//   datasets: [
//     {
//       data: [30, 20, 15, 25, 10],
//       backgroundColor: [
//         'rgba(255, 99, 132, 0.8)',
//         'rgba(54, 162, 235, 0.8)',
//         'rgba(255, 206, 86, 0.8)',
//         'rgba(75, 192, 192, 0.8)',
//         'rgba(153, 102, 255, 0.8)',
//       ],
//     }
//   ]
// }

// const customerData: CustomerData = {
//   labels: ['New', 'Returning', 'Inactive'],
//   datasets: [
//     {
//       label: 'Customer Segments',
//       data: [300, 450, 100],
//       backgroundColor: [
//         'rgba(75, 192, 192, 0.8)',
//         'rgba(54, 162, 235, 0.8)',
//         'rgba(255, 99, 132, 0.8)',
//       ],
//     }
//   ]
// }

// const initialProducts: Product[] = [
//   { id: 1, name: 'Smartphone', price: 699, stock: 50, image: '/placeholder.svg?height=50&width=50', category: 'Electronics', description: 'High-end smartphone with advanced features', sku: 'SMRT-001', weight: 0.2, dimensions: '15x7x1 cm' },
//   { id: 2, name: 'Laptop', price: 1299, stock: 30, image: '/placeholder.svg?height=50&width=50', category: 'Electronics', description: 'Powerful laptop for work and gaming', sku: 'LPTP-001', weight: 2.5, dimensions: '35x25x2 cm' },
//   { id: 3, name: 'Headphones', price: 199, stock: 100, image: '/placeholder.svg?height=50&width=50', category: 'Electronics', description: 'Noise-cancelling wireless headphones', sku: 'HDPH-001', weight: 0.3, dimensions: '18x18x8 cm' },
//   { id: 4, name: 'T-Shirt', price: 29, stock: 200, image: '/placeholder.svg?height=50&width=50', category: 'Clothing', description: 'Comfortable cotton t-shirt', sku: 'TSRT-001', weight: 0.2, dimensions: '30x20x2 cm' },
//   { id: 5, name: 'Jeans', price: 79, stock: 150, image: '/placeholder.svg?height=50&width=50', category: 'Clothing', description: 'Classic blue jeans', sku: 'JENS-001', weight: 0.5, dimensions: '40x30x5 cm' },
//   { id: 6, name: 'Novel', price: 15, stock: 300, image: '/placeholder.svg?height=50&width=50', category: 'Books', description: 'Bestselling fiction novel', sku: 'BOOK-001', weight: 0.4, dimensions: '20x15x3 cm' },
//   { id: 7, name: 'Cookbook', price: 25, stock: 80, image: '/placeholder.svg?height=50&width=50', category: 'Books', description: 'Gourmet recipes cookbook', sku: 'BOOK-002', weight: 0.8, dimensions: '25x20x2 cm' },
//   { id: 8, name: 'Plant Pot', price: 19, stock: 120, image: '/placeholder.svg?height=50&width=50', category: 'Home & Garden', description: 'Ceramic plant pot', sku: 'GRDN-001', weight: 1.0, dimensions: '20x20x20 cm' },
//   { id: 9, name: 'Throw Pillow', price: 39, stock: 100, image: '/placeholder.svg?height=50&width=50', category: 'Home & Garden', description: 'Decorative throw pillow', sku: 'HOME-001', weight: 0.5, dimensions: '45x45x10 cm' },
//   { id: 10, name: 'Toy Car', price: 24, stock: 200, image: '/placeholder.svg?height=50&width=50', category: 'Toys', description: 'Die-cast model car', sku: 'TOYS-001', weight: 0.3, dimensions: '15x7x5 cm' },
// ]

// const orders: Order[] = [
//   { id: 1, customer: 'John Doe', product: 'Smartphone', quantity: 1, total: 699, date: '2023-06-01', status: 'Delivered' },
//   { id: 2, customer: 'Jane Smith', product: 'Laptop', quantity: 1, total: 1299, date: '2023-06-02', status: 'Shipped' },
//   { id: 3, customer: 'Bob Johnson', product: 'Headphones', quantity: 2, total: 398, date: '2023-06-03', status: 'Processing' },
//   { id: 4, customer: 'Alice Brown', product: 'T-Shirt', quantity: 3, total: 87, date: '2023-06-04', status: 'Delivered' },
//   { id: 5, customer: 'Charlie Davis', product: 'Jeans', quantity: 1, total: 79, date: '2023-06-05', status: 'Shipped' },
// ]

// const customers: Customer[] = [
//   { id: 1, name: 'John Doe', email: 'john@example.com', orders: 5, spent: 2495, lastPurchase: '2023-06-01' },
//   { id: 2, name: 'Jane Smith', email: 'jane@example.com', orders: 3, spent: 1597, lastPurchase: '2023-06-02' },
//   { id: 3, name: 'Bob Johnson', email: 'bob@example.com', orders: 7, spent: 3492, lastPurchase: '2023-06-03' },
//   { id: 4, name: 'Alice Brown', email: 'alice@example.com', orders: 2, spent: 598, lastPurchase: '2023-06-04' },
//   { id: 5, name: 'Charlie Davis', email: 'charlie@example.com', orders: 4, spent: 1996, lastPurchase: '2023-06-05' },
// ]


















