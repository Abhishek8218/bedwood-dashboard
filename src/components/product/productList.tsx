'use client';

import { initialProducts } from "@/src/data/dummyData"
import { Product, ProductFormData } from "@/src/types/type"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useState } from "react"
import { ProductForm } from "./productForm"




export const  ProductList =() =>  {
    const [products, setProducts] = useState<Product[]>(initialProducts)
    const [editingProduct, setEditingProduct] = useState<Product | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [filterCategory, setFilterCategory] = useState('')
    const [filterPrice, setFilterPrice] = useState('')
    const [sortField, setSortField] = useState<keyof Product>('name')
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')
  
    const itemsPerPage = 20
  
    const filteredProducts = products
      .filter(product => !filterCategory || product.category === filterCategory)
      .filter(product => {
        if (!filterPrice) return true
        const [min, max] = filterPrice.split('-').map(Number)
        return product.price >= min && product.price <= max
      })
  
    const sortedProducts = [...filteredProducts].sort((a, b) => {
      if (a[sortField] < b[sortField]) return sortDirection === 'asc' ? -1 : 1
      if (a[sortField] > b[sortField]) return sortDirection === 'asc' ? 1 : -1
      return 0
    })
  
    const paginatedProducts = sortedProducts.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    )
  
    const pageCount = Math.ceil(sortedProducts.length / itemsPerPage)
  
    const handleAddProduct = (newProduct: ProductFormData) => {
      setProducts([...products, { ...newProduct, id: Date.now(), image: '/placeholder.svg?height=50&width=50' }])
      setIsModalOpen(false)
    }
  
    const handleUpdateProduct = (updatedProduct: ProductFormData) => {
      setProducts(products.map(p => p.id === editingProduct?.id ? { ...p, ...updatedProduct } : p))
      setEditingProduct(null)
      setIsModalOpen(false)
    }
  
    const handleDeleteProduct = (id: number) => {
      setProducts(products.filter(p => p.id !== id))
    }
  
    const handleSort = (field: keyof Product) => {
      if (field === sortField) {
        setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
      } else {
        setSortField(field)
        setSortDirection('asc')
      }
    }
  
    return (
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:px-6 flex justify-between items-center flex-wrap gap-4">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Products</h3>
          <div className="flex items-center space-x-4">
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              <option value="">All Categories</option>
              <option value="Electronics">Electronics</option>
              <option value="Clothing">Clothing</option>
              <option value="Books">Books</option>
              <option value="Home & Garden">Home & Garden</option>
              <option value="Toys">Toys</option>
            </select>
            <select
              value={filterPrice}
              onChange={(e) => setFilterPrice(e.target.value)}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              <option value="">All Prices</option>
              <option value="0-50">$0 - $50</option>
              <option value="51-100">$51 - $100</option>
              <option value="101-500">$101 - $500</option>
              <option value="501-1000">$501 - $1000</option>
              <option value="1001-">$1001+</option>
            </select>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Add Product
          </button>
        </div>
        <div className="px-4 py-5 sm:p-6 overflow-x-scroll">
          <div className="overflow-x-scroll">
            <table className="min-w-full divide-y divide-gray-200 overflow-x-hidden">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('name')}>
                    Name {sortField === 'name' && (sortDirection === 'asc' ? '▲' : '▼')}
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('price')}>
                    Price {sortField === 'price' && (sortDirection === 'asc' ? '▲' : '▼')}
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('stock')}>
                    Stock {sortField === 'stock' && (sortDirection === 'asc' ? '▲' : '▼')}
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('category')}>
                    Category {sortField === 'category' && (sortDirection === 'asc' ? '▲' : '▼')}
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 overflow-x-hidden">
                {paginatedProducts.map((product) => (
                  <tr key={product.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <img src={product.image} alt={product.name} className="w-12 h-12 object-cover rounded" />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{product.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">${product.price}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{product.stock}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{product.category}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => {
                          setEditingProduct(product)
                          setIsModalOpen(true)
                        }}
                        className="text-indigo-600 hover:text-indigo-900 mr-4"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(product.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> to <span className="font-medium">{Math.min(currentPage * itemsPerPage, sortedProducts.length)}</span> of{' '}
                <span className="font-medium">{sortedProducts.length}</span> results
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <button
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  <span className="sr-only">Previous</span>
                  <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                </button>
                {[...Array(pageCount)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                      currentPage === i + 1
                        ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
                        : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === pageCount}
                  className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  <span className="sr-only">Next</span>
                  <ChevronRight className="h-5 w-5" aria-hidden="true" />
                </button>
              </nav>
            </div>
          </div>
        </div>
        {isModalOpen && (
          <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
              <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4" id="modal-title">
                    {editingProduct ? 'Edit Product' : 'Add New Product'}
                  </h3>
                  <ProductForm
                    product={editingProduct || undefined}
                    onSubmit={editingProduct ? handleUpdateProduct : handleAddProduct}
                    onCancel={() => {
                      setIsModalOpen(false)
                      setEditingProduct(null)
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }
  