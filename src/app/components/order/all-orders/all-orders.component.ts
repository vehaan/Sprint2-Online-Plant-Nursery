import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { IProduct } from '../../welcome/IProduct';
import { Order } from '../order-list/order';


@Component({
  selector: 'app-all-orders',
  templateUrl: './all-orders.component.html',
  styleUrls: ['./all-orders.component.css']
})
export class AllOrdersComponent implements OnInit {

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

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.orderService.getAllOrders().subscribe(
      (data) => {
        this.orders = data;
      },
      (err) => this.error = err
    );
  }


  ngDoCheck(): void {

    this.orderService.getAllOrders().subscribe(
      (data) => {
        this.orders = data;
      },
      (err) => this.error = err
    );

    //Filtering BY Payment
    let tempOrders: (any | Order)[] = [];
    if(this.cash) {
      tempOrders = [...this.pmCash]
    }
    if(this.card) {
      tempOrders = [...tempOrders, ...this.pmCard]
      console.log(tempOrders);
    }
    if(this.upi) {
      tempOrders = [...tempOrders, ...this.pmUpi]
    }

    if(!this.cash && !this.card && !this.upi) { // If nothing is selected 
      tempOrders = this.orders
      console.log(JSON.stringify(tempOrders));
      console.log(JSON.stringify(this.orders))
    }

    if(this.cash && this.card && this.upi) {
      tempOrders = this.orders;
      console.log(JSON.stringify(tempOrders));

    }
    
    // Sorting
    this.orders = tempOrders;
    // console.log(JSON.stringify(this.orders))
    if (this.sortLowToHigh) {
      this.orders.sort((a, b) => (a.totalCost > b.totalCost) ? 1 : -1)
    }
    if (this.sortHighToLow) {
      this.orders.sort((a, b) => (a.totalCost < b.totalCost) ? 1 : -1)
    }

    if(this.orders.length==0){
      // console.log(this.orders.length)
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
    console.log(this.cash);
    this.orderService.filterByTransactionMode('CASH').subscribe(
      (data) => this.pmCash = data,
      (err) => this.error = err)
  }

  paymentModeCard() {
    this.card = !this.card;
    console.log(this.card);
    this.orderService.filterByTransactionMode('CARD').subscribe(
      (data) => this.pmCard = data,
      (err) => this.error = err)
  }

  paymentModeUpi() {
    this.upi = !this.upi;
    console.log(this.upi);
    this.orderService.filterByTransactionMode('UPI').subscribe(
      (data) => this.pmUpi = data,
      (err) => this.error = err)
  }


}