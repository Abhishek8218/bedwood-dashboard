
interface ISelectedVariation {
    _id: string;
    value: string;
    type: string;
}

    interface IOrderDetail {
        quantity: number;           // The quantity of the item ordered
        name: string;              // The name of the item
        price: number;             // The price of the item
        categoryName: string;      // The category of the item
        selectedVariation: ISelectedVariation;
      }
      
      // Define the Order type for each order
      export type TOrder = {
        _id: string;               // The unique identifier for the order
        status: string;            // The current status of the order
        name: string;              // The name of the customer
        email: string;             // The email of the customer
        phone: string;             // The phone number of the customer
        address: string;           // The address of the customer
        totalPrice: number;        // The total price of the order
        orderDetails: IOrderDetail[]; // An array of order details
      }