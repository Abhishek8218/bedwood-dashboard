import { CategoryData, Customer, CustomerData, Order, Product, SalesData } from "../types/type"

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
  
  export const initialProducts: Product[] = [
    { id: 1, name: 'Smartphone', price: 699, stock: 50, image: 'https://via.placeholder.com/50?text=Image', category: 'Electronics', description: 'High-end smartphone with advanced features' },
    { id: 2, name: 'Laptop', price: 1299, stock: 30, image: 'https://via.placeholder.com/50?text=Image', category: 'Electronics', description: 'Powerful laptop for work and gaming'},
    { id: 3, name: 'Headphones', price: 199, stock: 100, image: 'https://via.placeholder.com/50?text=Image', category: 'Electronics', description: 'Noise-cancelling wireless headphones'},
    { id: 4, name: 'T-Shirt', price: 29, stock: 200, image: 'https://via.placeholder.com/50?text=Image', category: 'Clothing', description: 'Comfortable cotton t-shirt' },
    { id: 5, name: 'Jeans', price: 79, stock: 150, image: 'https://via.placeholder.com/50?text=Image', category: 'Clothing', description: 'Classic blue jeans'},
    { id: 6, name: 'Novel', price: 15, stock: 300, image: 'https://via.placeholder.com/50?text=Image', category: 'Books', description: 'Bestselling fiction novel'},
    { id: 7, name: 'Cookbook', price: 25, stock: 80, image: 'https://via.placeholder.com/50?text=Image', category: 'Books', description: 'Gourmet recipes cookbook' },
    { id: 8, name: 'Plant Pot', price: 19, stock: 120, image: 'https://via.placeholder.com/50?text=Image', category: 'Home & Garden', description: 'Ceramic plant pot'},
    { id: 9, name: 'Throw Pillow', price: 39, stock: 100, image: 'https://via.placeholder.com/50?text=Image', category: 'Home & Garden', description: 'Decorative throw pillow' },
    { id: 10, name: 'Toy Car', price: 24, stock: 200, image: 'https://via.placeholder.com/50?text=Image', category: 'Toys', description: 'Die-cast model car'},
    { id: 11, name: 'Toy Plane', price: 29, stock: 150, image: 'https://via.placeholder.com/50?text=Image', category: 'Toys', description: 'Remote-controlled toy plane'},
    { id: 12, name: 'Toy Train', price: 19, stock: 180, image: 'https://via.placeholder.com/50?text=Image', category: 'Toys', description: 'Wooden toy train'},
    { id: 13, name: 'Toy Doll', price: 29, stock: 100, image: 'https://via.placeholder.com/50?text=Image', category: 'Toys', description: 'Interactive toy doll'},
    { id: 14, name: 'Toy Robot', price: 39, stock: 80, image: 'https://via.placeholder.com/50?text=Image', category: 'Toys', description: 'Educational toy robot'},
    { id: 15, name: 'Toy Blocks', price: 15, stock: 250, image: 'https://via.placeholder.com/50?text=Image', category: 'Toys', description: 'Building blocks set'},
    { id: 16, name: 'Toy Puzzle', price: 19, stock: 200, image: 'https://via.placeholder.com/50?text=Image', category: 'Toys', description: 'Jigsaw puzzle set'},
    { id: 17, name: 'Toy Playset', price: 29, stock: 150, image: 'https://via.placeholder.com/50?text=Image', category: 'Toys', description: 'Imaginative playset'},
    { id: 18, name: 'Toy Vehicle', price: 25, stock: 180, image: 'https://via.placeholder.com/50?text=Image', category: 'Toys', description: 'Miniature vehicle set'},
    { id: 19, name: 'Toy Animal', price: 19, stock: 100, image: 'https://via.placeholder.com/50?text=Image', category: 'Toys', description: 'Stuffed animal toy'},
    { id: 20, name: 'Toy Boardgame', price: 29, stock: 80, image: 'https://via.placeholder.com/50?text=Image', category: 'Toys', description: 'Classic boardgame set'},
    { id: 21, name: 'Toy Playdough', price: 15, stock: 250, image: 'https://via.placeholder.com/50?text=Image', category: 'Toys', description: 'Creative playdough set'},
    { id: 22, name: 'Toy Art', price: 19, stock: 200, image: 'https://via.placeholder.com/50?text=Image', category: 'Toys', description: 'Art and craft set'},
    { id: 23, name: 'Toy Science', price: 29, stock: 150, image: 'https://via.placeholder.com/50?text=Image', category: 'Toys', description: 'Science experiment kit'},
    { id: 24, name: 'Toy Musical', price: 25, stock: 180, image: 'https://via.placeholder.com/50?text=Image', category: 'Toys', description: 'Musical instrument toy'},
    { id: 25, name: 'Toy Sports', price: 19, stock: 100, image: 'https://via.placeholder.com/50?text=Image', category: 'Toys', description: 'Sports equipment toy'},
  ]
  
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
  