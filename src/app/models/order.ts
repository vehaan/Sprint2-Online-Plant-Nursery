import { Customer } from "./customer";

export interface Order {
    bookingId: number;
    bookingDate: Date;
    transactionMode: string;
    quantity: number;
    totalCost: number;
    products: Map<number, number>;
    customer: Customer;
}