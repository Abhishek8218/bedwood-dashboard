'use client';


import { categoryData, customerData, initialProducts, salesData } from "@/src/data/dummyData"
import { useState } from "react"
import { Bar, Doughnut, Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  BarElement,
  Title,
  Tooltip,
  Legend
)

export const Analytics = () =>  {
    const chartOptions: ChartOptions<'line' | 'doughnut' | 'bar'> = {
      responsive: true,
      maintainAspectRatio: false,
    }
  
    const [selectedView, setSelectedView] = useState('monthly')
    const [selectedCategory, setSelectedCategory] = useState('all')
  
    const filterData = () => {
      // This is where you would normally filter your data based on the selected view and category
      // For this example, we'll just return the original data
      return salesData
    }
  
    const filteredData = filterData()
  
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Sales Trend</h3>
          <div className="mb-4">
            <select
              value={selectedView}
              onChange={(e) => setSelectedView(e.target.value)}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              <option value="monthly">Monthly</option>
              <option value="weekly">Weekly</option>
              <option value="daily">Daily</option>
            </select>
          </div>
          <div className="h-80">
            <Line data={filteredData} options={chartOptions as ChartOptions<'line'>} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Sales by Category</h3>
          <div className="mb-4">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              <option value="all">All Categories</option>
              <option value="electronics">Electronics</option>
              <option value="clothing">Clothing</option>
              <option value="books">Books</option>
              <option value="home">Home & Garden</option>
              <option value="toys">Toys</option>
            </select>
          </div>
          <div className="h-80">
            <Doughnut data={categoryData} options={chartOptions} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Customer Segments</h3>
          <div className="h-80">
            <Bar data={customerData} options={chartOptions} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow overflow-scroll">
          <h3 className="text-lg font-semibold mb-4">Top Selling Products</h3>
          <table className="min-w-full divide-y divide-gray-200 ">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Units Sold</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {initialProducts.slice(0, 5).map((product) => (
                <tr key={product.id} >
                  <td className="px-6 py-4 whitespace-nowrap">{product.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{product.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap">342</td>
                  <td className="px-6 py-4 whitespace-nowrap">${product.price * 34}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  }