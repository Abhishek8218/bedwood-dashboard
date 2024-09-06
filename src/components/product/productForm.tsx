'use client';

import { ProductFormData, ProductFormProps } from "@/src/types/type"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from 'yup';
import { Controller, useForm } from "react-hook-form"

const productSchema = yup.object({
    name: yup.string().required('Product name is required'),
    price: yup.number().positive('Price must be positive').required('Price is required'),
    stock: yup.number().integer('Stock must be an integer').positive('Stock must be positive').required('Stock is required'),
    category: yup.string().required('Category is required'),
    description: yup.string().required('Description is required'),

  }).required()


export const  ProductForm = ({ product, onSubmit, onCancel }: ProductFormProps) =>  {
    const { control, handleSubmit, formState: { errors } } = useForm<ProductFormData>({
      resolver: yupResolver(productSchema),
      defaultValues: product || { name: '', price: 0, stock: 0, category: '', description: ''},
    })
  
    return (
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Product Name</label>
            <Controller
              name="name"
              control={control}
              render={({ field }) => <input id="name" {...field} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />}
            />
            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
          </div>
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
            <Controller
              name="price"
              control={control}
              render={({ field }) => <input id="price" type="number" step="0.01" {...field} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />}
            />
            {errors.price && <p className="mt-1 text-sm text-red-600">{errors.price.message}</p>}
          </div>
          <div>
            <label htmlFor="stock" className="block text-sm font-medium text-gray-700">Stock</label>
            <Controller
              name="stock"
              control={control}
              render={({ field }) => <input id="stock" type="number" {...field} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />}
            />
            {errors.stock && <p className="mt-1 text-sm text-red-600">{errors.stock.message}</p>}
          </div>
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <select id="category" {...field} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                  <option value="">Select a category</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Clothing">Clothing</option>
                  <option value="Books">Books</option>
                  <option value="Home & Garden">Home & Garden</option>
                  <option value="Toys">Toys</option>
                </select>
              )}
            />
            {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>}
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
            <Controller
              name="description"
              control={control}
              render={({ field }) => <textarea id="description" {...field} rows={3} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />}
            />
            {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>}
          </div>
         
          
         
        </div>
        <div className="flex justify-end space-x-2">
          <button type="button" onClick={onCancel} className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Cancel
          </button>
          <button type="submit" className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Save
          </button>
        </div>
      </form>
    )
  }