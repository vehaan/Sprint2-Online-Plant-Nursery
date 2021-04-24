import { Customer } from "./customer";

export interface Order {
    id: number;
    bookingDate: Date; //= new Date(); //Had to check String or Date
    transactionMode: string ; //Enum in back end
    quantity: number;
    totalCost: number;
    products: Map<number, number>; // = new Map<number, number>();
    customer: Customer;
}