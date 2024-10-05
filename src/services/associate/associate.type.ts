export type User = {
    _id: string;
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    qualification: string;
    age: number;
    occupation: string | null; // Since occupation can be "null" as a string
    address: string;
    country: string;
}