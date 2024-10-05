import { CategoryData, Customer, CustomerData, Order, SalesData } from "../types/type"

// Dummy data
export const salesData: SalesData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Sales',
        data: [12000, 19000, 3000, 5000, 2000, 3000, 20000, 3000, 5000, 6000, 23000, 45000],
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  }
  
  export const categoryData: CategoryData = {
    labels: ['Electronics', 'Clothing', 'Books', 'Home & Garden', 'Toys'],
    datasets: [
      {
        data: [30, 20, 15, 25, 10],
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 206, 86, 0.8)',
          'rgba(75, 192, 192, 0.8)',
          'rgba(153, 102, 255, 0.8)',
        ],
      }
    ]
  }
  
  export const customerData: CustomerData = {
    labels: ['New', 'Returning', 'Inactive'],
    datasets: [
      {
        label: 'Customer Segments',
        data: [300, 450, 100],
        backgroundColor: [
          'rgba(75, 192, 192, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 99, 132, 0.8)',
        ],
      }
    ]
  }
  

  
  export const orders: Order[] = [
    { id: 1, customer: 'John Doe', product: 'Smartphone', quantity: 1, total: 699, date: '2023-06-01', status: 'Delivered' },
    { id: 2, customer: 'Jane Smith', product: 'Laptop', quantity: 1, total: 1299, date: '2023-06-02', status: 'Shipped' },
    { id: 3, customer: 'Bob Johnson', product: 'Headphones', quantity: 2, total: 398, date: '2023-06-03', status: 'Processing' },
    { id: 4, customer: 'Alice Brown', product: 'T-Shirt', quantity: 3, total: 87, date: '2023-06-04', status: 'Delivered' },
    { id: 5, customer: 'Charlie Davis', product: 'Jeans', quantity: 1, total: 79, date: '2023-06-05', status: 'Shipped' },
  ]
  
  export const customers: Customer[] = [
    { id: 1, name: 'John Doe', email: 'john@example.com', orders: 5, spent: 2495},
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', orders: 3, spent: 1597 },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', orders: 7, spent: 3492,  },
    { id: 4, name: 'Alice Brown', email: 'alice@example.com', orders: 2, spent: 598, },
    { id: 5, name: 'Charlie Davis', email: 'charlie@example.com', orders: 4, spent: 1996, },
  ]
  