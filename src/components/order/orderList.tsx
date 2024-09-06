'use client';


import { orders } from "@/src/data/dummyData";
import { Order } from "@/src/types/type";
import { useState } from "react";

export const  OrderList = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [sortField, setSortField] = useState<keyof Order>('id');
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
    const [filterStatus, setFilterStatus] = useState('');
    const [filterDate, setFilterDate] = useState('');
  
    const itemsPerPage = 20;
    console.log(filterDate)
   // Replace with actual orders data
  
    const filteredOrders = orders
      .filter(order => !filterStatus || order.status === filterStatus)
      .filter(order => !filterDate || order.date.startsWith(filterDate));
  
    const sortedOrders = [...filteredOrders].sort((a, b) => {
      if (a[sortField] < b[sortField]) return sortDirection === 'asc' ? -1 : 1;
      if (a[sortField] > b[sortField]) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  
    const paginatedOrders = sortedOrders.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
  
    const pageCount = Math.ceil(sortedOrders.length / itemsPerPage);
  
    const handleSort = (field: keyof Order) => {
      if (field === sortField) {
        setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
      } else {
        setSortField(field);
        setSortDirection('asc');
      }
    };
  
  
    const handlePrevPage = () => {
      setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
    };
  
    const handleNextPage = () => {
      setCurrentPage(prevPage => Math.min(prevPage + 1, pageCount));
    };
  
    return (
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:px-6 flex justify-between items-center flex-wrap gap-4">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Recent Orders</h3>
          <div className="flex items-center space-x-4">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              <option value="">All Statuses</option>
              <option value="Processing">Processing</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
            </select>
            <input
              type="date"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            />
         
          </div>
        </div>
        <div className="px-4 py-5 sm:p-6">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('id')}>
                    Order ID {sortField === 'id' && (sortDirection === 'asc' ? '▲' : '▼')}
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('customer')}>
                    Customer {sortField === 'customer' && (sortDirection === 'asc' ? '▲' : '▼')}
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('product')}>
                    Product {sortField === 'product' && (sortDirection === 'asc' ? '▲' : '▼')}
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('quantity')}>
                    Quantity {sortField === 'quantity' && (sortDirection === 'asc' ? '▲' : '▼')}
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('total')}>
                    Total {sortField === 'total' && (sortDirection === 'asc' ? '▲' : '▼')}
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('date')}>
                    Date {sortField === 'date' && (sortDirection === 'asc' ? '▲' : '▼')}
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('status')}>
                    Status {sortField === 'status' && (sortDirection === 'asc' ? '▲' : '▼')}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paginatedOrders.map((order) => (
                  <tr key={order.id}>
                    <td className="px-6 py-4 whitespace-nowrap">{order.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{order.customer}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{order.product}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{order.quantity}</td>
                    <td className="px-6 py-4 whitespace-nowrap">${order.total}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{order.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{order.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-4 py-3 flex items-center justify-between">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-300 text-white rounded-md hover:bg-gray-400 disabled:opacity-50"
            >
              Previous
            </button>
            <span>
              Page {currentPage} of {pageCount}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === pageCount}
              className="px-4 py-2 bg-gray-300 text-white rounded-md hover:bg-gray-400 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    );
  }
  