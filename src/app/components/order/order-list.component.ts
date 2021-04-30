import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/models/IProduct';
import { Order } from 'src/app/models/order';
import { OrderService } from 'src/app/services/order/order.service';
import { PlanterService } from 'src/app/services/planter/planter.service';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {

  private error!: string;
  orders!: Order[];
  orderedPlanters!: IProduct[];
  filterOrders!: Order[];

  pmCash!: Order[];
  pmCard!: Order[];
  pmUpi!: Order[];
  noOrder: boolean = false;
  
  sortLowToHigh: boolean = false;
  cash: boolean = false;
  card: boolean = false;
  upi: boolean = false;

  sortHighToLow: boolean = false;

  constructor(private orderService: OrderService, private productService: ProductService ) { }

  ngOnInit(): void {
    this.orderService.getAllCustomerOrders(204).subscribe(
      (data) => {
        this.orders = data;
      },
      (err) => this.error = err
    );
    
  }

  ngOnChanges(): void {
    this.orderService.getAllCustomerOrders(204).subscribe(
      (data) => {
        this.orders = data;
      },
      (err) => this.error = err
    );
  }

  ngDoCheck(): void {

    this.orderService.getAllCustomerOrders(204).subscribe(
      (data) => {
        this.orders = data;
      },
      (err) => this.error = err
    );

    //Filtering BY Payment
    let tempOrders: (any | Order)[] = [];
    if(this.cash) {
      tempOrders = [...this.pmCash];
    }
    if(this.card) {
      tempOrders = [...tempOrders, ...this.pmCard];
    }
    if(this.upi) {
      tempOrders = [...tempOrders, ...this.pmUpi];
    }

    if(!this.cash && !this.card && !this.upi) { // If nothing is selected 
      tempOrders = this.orders;
    }

    if(this.cash && this.card && this.upi) {
      tempOrders = this.orders;
    }
    
    // Sorting
    this.orders = tempOrders;
    if (this.sortLowToHigh) {
      this.orders.sort((a, b) => (a.totalCost > b.totalCost) ? 1 : -1)
    }
    if (this.sortHighToLow) {
      this.orders.sort((a, b) => (a.totalCost < b.totalCost) ? 1 : -1)
    }

    if(this.orders.length==0){
      this.noOrder = true;
    }
    else this.noOrder=false;
  
  }

  ascendingSort() {
    this.sortLowToHigh = !this.sortLowToHigh;
    this.sortHighToLow = false;
  }
 
  descendingSort() {
    this.sortLowToHigh = false;
    this.sortHighToLow = !this.sortHighToLow;
  }


  paymentModeCash() {
    this.cash = !this.cash;
    this.orderService.filterByTransactionModeCustomer('CASH', 204).subscribe(
      (data) => this.pmCash = data,
      (err) => this.error = err)
  }

  paymentModeCard() {
    this.card = !this.card;
    this.orderService.filterByTransactionModeCustomer('CARD', 204).subscribe(
      (data) => this.pmCard = data,
      (err) => this.error = err)
  }

  paymentModeUpi() {
    this.upi = !this.upi;
    this.orderService.filterByTransactionModeCustomer('UPI', 204).subscribe(
      (data) => this.pmUpi = data,
      (err) => this.error = err)
  }

}
