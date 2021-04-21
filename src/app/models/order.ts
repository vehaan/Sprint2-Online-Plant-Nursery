export class Order {
    id: number = 0;
    bookingDate: Date = new Date(); //Had to check String or Date
    transactionMode: string = ''; //Enum in back end
    quantity: number = 0;
    totalCost: number = 0;
    products: Map<number, number> = new Map<number, number>();
    //customer: Customer;
}