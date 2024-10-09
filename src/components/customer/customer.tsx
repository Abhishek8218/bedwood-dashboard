import {  useState } from "react";
import { useQuery } from '@tanstack/react-query';
import { getAssociates } from "@/src/services/associate";

// Import your API config



interface Customer {
  _id?: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  qualification: string;
  age: number;
  occupation: string;
  address: string;
  country: string;
}

interface CustomerDetailsModalProps {
  customer: Customer;
  onClose: () => void;
}

const CustomerDetailsModal = ({ customer, onClose }: CustomerDetailsModalProps) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-md">
        <h3 className="text-xl font-semibold border-b pb-2 mb-4">Customer Details</h3>
        <div className="mt-2">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="font-medium">First Name:</p>
              <p>{customer.firstName}</p>
            </div>
            <div>
              <p className="font-medium">Last Name:</p>
              <p>{customer.lastName}</p>
            </div>
            <div>
              <p className="font-medium">Phone:</p>
              <p>{customer.phone}</p>
            </div>
            <div>
              <p className="font-medium">Email:</p>
              <p>{customer.email}</p>
            </div>
            <div>
              <p className="font-medium">Qualification:</p>
              <p>{customer.qualification}</p>
            </div>
            <div>
              <p className="font-medium">Age:</p>
              <p>{customer.age}</p>
            </div>
            <div>
              <p className="font-medium">Occupation:</p>
              <p>{customer.occupation}</p>
            </div>
            <div>
              <p className="font-medium">Address:</p>
              <p>{customer.address}</p>
            </div>
            <div>
              <p className="font-medium">Country:</p>
              <p>{customer.country}</p>
            </div>
          </div>
        </div>
        <button
          className="mt-6 w-full bg-blue-600 text-white font-bold py-2 rounded hover:bg-blue-700 transition duration-300"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};


export const CustomerList = () => {
  // Fetching customers using useQuery
  const { data: customers = [], isLoading, error } = useQuery({
    queryKey: ['customers'],
    queryFn: getAssociates,
  
  });
  
  const [selectedCustomer, setSelectedCustomer] = useState<Customer>();
  
  const handleRowClick = (customer:Customer) => {
    setSelectedCustomer(customer);
  };

  const closeDetailsModal = () => {
    setSelectedCustomer(undefined);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching Associate: {error.message}</div>;

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Associates</h3>
      </div>
      <div className="px-4 py-5 sm:p-6 overflow-x-scroll">
        <table className="min-w-full divide-y divide-gray-200 overflow-x-scroll">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">First Name</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Name</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Qualification</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Age</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {customers?.data.reverse().map((customer:Customer) => (
              <tr key={customer._id} onClick={() => handleRowClick(customer)} className="cursor-pointer hover:bg-gray-100">
                <td className="px-6 py-4 whitespace-nowrap">{customer.firstName}</td>
                <td className="px-6 py-4 whitespace-nowrap">{customer.lastName}</td>
                <td className="px-6 py-4 whitespace-nowrap">{customer.phone}</td>
                <td className="px-6 py-4 whitespace-nowrap">{customer.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">{customer.qualification}</td>
                <td className="px-6 py-4 whitespace-nowrap">{customer.age}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedCustomer && (
        <CustomerDetailsModal customer={selectedCustomer} onClose={closeDetailsModal} />
      )}
    </div>
  );
};
