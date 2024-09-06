import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Customer } from "@/src/types/type";

// Define your validation schema with Yup
const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  orders: yup.number().required("Orders are required").positive("Orders must be a positive number"),
  spent: yup.number().required("Total Spent is required").positive("Total Spent must be a positive number"),
});

interface CustomerFormProps {
  onSubmit: (customer:Customer) => void;
  onClose: () => void;
}

const CustomerForm = ({ onSubmit, onClose }: CustomerFormProps) => {
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      orders: 0,
      spent: 0,
    }
  });

  const handleFormSubmit = (data: { name: string; email: string; orders: number; spent: number }) => {
    onSubmit({ ...data, id: Date.now() }); // Convert the Date object to a string
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Add New Customer</h3>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                />
              )}
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="email"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                />
              )}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Orders</label>
            <Controller
              name="orders"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="number"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                />
              )}
            />
            {errors.orders && <p className="text-red-500 text-xs mt-1">{errors.orders.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Total Spent</label>
            <Controller
              name="spent"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="number"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                />
              )}
            />
            {errors.spent && <p className="text-red-500 text-xs mt-1">{errors.spent.message}</p>}
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-blue-600"
            >
              Add Customer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CustomerForm;
