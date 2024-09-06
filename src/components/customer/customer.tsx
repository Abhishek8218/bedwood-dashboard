import { useState } from "react";
import { customers as initialCustomers } from "@/src/data/dummyData";
import CustomerForm from "./customerForm";
import { Customer } from "@/src/types/type";

export const CustomerList = () => {
  const [customers, setCustomers] = useState(initialCustomers);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const openForm = () => setIsFormOpen(true);
  const closeForm = () => setIsFormOpen(false);

  const handleAddCustomer = (newCustomer: Customer) => {
    setCustomers([...customers, newCustomer]);
    closeForm();
  };

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Customers</h3>
        <button
          onClick={openForm}
          className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-blue-600"
        >
          Add Customer
        </button>
      </div>
      <div className="px-4 py-5 sm:p-6 overflow-x-scroll">
        <table className="min-w-full divide-y divide-gray-200 overflow-x-scroll">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Orders</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Spent</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {customers.reverse().map((customer) => (
              <tr key={customer.id}>
                <td className="px-6 py-4 whitespace-nowrap">{customer.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{customer.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">{customer.orders}</td>
                <td className="px-6 py-4 whitespace-nowrap">${customer.spent}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isFormOpen && <CustomerForm onSubmit={handleAddCustomer} onClose={closeForm} />}
    </div>
  );
}
