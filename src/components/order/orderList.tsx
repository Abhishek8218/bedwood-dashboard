'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { getOrders, updateOrderStatus, orderDetails } from '@/src/services/order';
import { TOrder } from '@/src/services/order/order.type';

export const OrderList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null); // State for selected order ID
  const [newStatus, setNewStatus] = useState<string>(''); // State for new status
  const [isStatusPopupOpen, setIsStatusPopupOpen] = useState(false); 
  const [statusFilter, setStatusFilter] = useState<string>(''); // To handle status update popup visibility

  const itemsPerPage = 20;
  const queryClient = useQueryClient();

  // Using TanStack Query to fetch orders
  const { data: orders = [], isLoading, error } = useQuery({
    queryKey: ['orders', currentPage, statusFilter],
    queryFn: () => getOrders(currentPage,statusFilter),
  });

  // Mutation to update order status
  const updateStatus = useMutation({
    mutationKey: ['updateStatus'],
    mutationFn: updateOrderStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      queryClient.invalidateQueries({queryKey: ['orderDetail', selectedOrderId]});
      closeStatusPopup();
      console.log('Status updated successfully');
    },
    onError: (err) => {
      console.error('Error updating status:', err);
    },
  });

  const paginatedOrders = orders.data?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const pageCount = Math.ceil(orders.data?.length / itemsPerPage);

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, pageCount));
  };

  const closePopup = () => {
    setSelectedOrderId(null); // Close the details popup
  };

  const openStatusPopup = () => {
    setIsStatusPopupOpen(true);
  };

  const closeStatusPopup = () => {
    setIsStatusPopupOpen(false);
    setNewStatus(''); // Reset status selection
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setNewStatus(e.target.value);
  };

  const handleStatusUpdate = () => {
    if (selectedOrderId && newStatus) {
      updateStatus.mutate({ orderId: selectedOrderId, status: newStatus });
    }
  };
  
   // Handle status filter change
   const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatusFilter(e.target.value);
  };


  // Fetching order details when the popup is opened
  const orderDetail = useQuery({
    queryKey: ['orderDetail', selectedOrderId],
    queryFn: () => selectedOrderId ? orderDetails(selectedOrderId) : null,
    enabled: !!selectedOrderId, // Only run query if order is selected
  });

  const handleRowClick = (orderId: string) => {
    setSelectedOrderId(orderId);
    console.log('Selected Order:', orderId);

 // Set selected order ID for details popup
  };

  console.log('selectedOrderId:', selectedOrderId);

  console.log('orders:', orderDetail.data?.data.name);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading orders</div>;

  console.log('order detail', paginatedOrders)

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:px-6 flex justify-between items-center flex-wrap gap-4">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Recent Orders</h3>


        {/* Status filter dropdown */}
        <div>
          <label htmlFor="status-filter" className="mr-2 text-sm font-medium text-gray-700">
            Filter by Status:
          </label>
          <select
            id="status-filter"
            value={statusFilter}
            onChange={handleFilterChange}
            className="p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
           
            <option value="">All</option>
            <option value="Initiated">Initiated</option>
            <option value="Delivered">Delivered</option>
            <option value="Shipped">Shipped</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      </div>
      <div className="px-4 py-5 sm:p-6">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedOrders.map((order: TOrder) => (
                <tr key={order._id} onClick={() => handleRowClick(order._id)} className="cursor-pointer hover:bg-gray-100">
                  <td className="px-6 py-4 whitespace-nowrap">{order._id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{order.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">${order.totalPrice}</td>
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

      {/* Popup for order details */}
      {selectedOrderId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            {orderDetail.isLoading ? (
              <div>Loading order details...</div>
            ) : orderDetail.error ? (
              <div>Error loading order details</div>
            ) : (
              orderDetail.data && (
                <div>
                  <h2 className="text-xl font-bold mb-2">Order Details</h2>
                  <p className="text-gray-700">
                    <strong>Customer:</strong> {orderDetail.data?.data.name}
                  </p>
                  <p className="text-gray-700">
                    <strong>Email:</strong> {orderDetail.data?.data.email}
                  </p>
                  <p className="text-gray-700">
                    <strong>Phone:</strong> {orderDetail.data?.data.phone}
                  </p>
                  <p className="text-gray-700">
                    <strong>Address:</strong> {orderDetail.data?.data.address}
                  </p>
                  <p className="text-gray-800 font-semibold">
                    <strong>Total Price:</strong> ${orderDetail.data?.data.totalPrice}
                  </p>
                  <h3 className="mt-4 font-medium text-lg">Order Items:</h3>
                  <ul className="list-disc ml-6">
                    {orderDetail.data?.data.orderDetails?.map((item: { quantity: number; name: string; price: number; categoryName: string; selectedVariation?: { type: string; value: string } }, index: number) => (
                      <li key={index} className="text-gray-700">
                        {item.quantity} x {item.name} (${item.price} each, Category: {item.categoryName})
                        {item.selectedVariation && (
                          <div className="text-sm text-gray-600">
                            <strong>Variation:</strong> {item.selectedVariation.type} - {item.selectedVariation.value}
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 flex justify-end space-x-2">
                    <button onClick={closePopup} className="px-4 py-2 bg-blue-600 text-white rounded-md">
                      Close
                    </button>
                    <button onClick={openStatusPopup} className="px-4 py-2 bg-green-600 text-white rounded-md">
                      Update Status
                    </button>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      )}



           {/* Popup for status update */}
  {isStatusPopupOpen && orderDetail && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
    <div className="bg-white p-6 rounded-lg shadow-lg transform transition-all duration-300 ease-in-out scale-100 hover:scale-105">
      <h2 className="text-xl font-bold mb-2">Update Order Status</h2>
      <p className="text-gray-700">Current Status: <span className="font-semibold">{orderDetail.data.data.status}</span></p>
      <select value={newStatus} onChange={handleStatusChange} className="mt-4 border border-gray-300 p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-400">
        <option value="" disabled>
          Select new status
        </option>
        <option value="Processing">Processing</option>
        <option value="Shipped">Shipped</option>
        <option value="Delivered">Delivered</option>
        <option value="Cancelled">Cancelled</option>
      </select>
      <div className="mt-6 flex justify-between">
        <button onClick={closeStatusPopup} className="px-4 py-2 bg-gray-400 text-white rounded-md transition hover:bg-gray-500">
          Cancel
        </button>
        <button
          onClick={handleStatusUpdate}
          disabled={!newStatus}
          className={`px-4 py-2 rounded-md transition ${!newStatus ? 'bg-gray-300' : 'bg-green-600 hover:bg-green-700'} text-white`}
        >
          Update
        </button>
      </div>
    </div>
  </div>
)}
    </div>
  );
};
