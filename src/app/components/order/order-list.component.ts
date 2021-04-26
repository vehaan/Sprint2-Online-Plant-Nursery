import { Component, OnInit } from '@angular/core';
import { IPlanter } from 'src/app/models/IPlanter';
import { IProduct } from 'src/app/models/IProduct';
import { Order } from 'src/app/models/order';
import { OrderService } from 'src/app/services/order/order.service';
import { PlanterService } from 'src/app/services/planter/planter.service';

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
  // orderedProductsMap!: Map<number, number>;
  // orderedPlantersId!: number[];
  // orderedPlantersCost!: number[];

  constructor(private orderService: OrderService, private planterService: PlanterService ) { }

  ngOnInit(): void {
    this.orderService.getAllCustomerOrders(202).subscribe(
      (data) => {
        this.orders = data;
      },
      (err) => this.error = err
    );
    
    console.log(this.orders)

    // if(this.orders){
    //   for(let i=0; i<this.orders.length; i++){
    //     let map = this.orders[i].products;

    //     for(let key of map.keys()){
    //       this.orderedPlantersId.push(key);
    //     }
    //     console.log(this.orderedPlantersId);

    //     for(let value of map.values()){
    //       this.orderedPlantersCost.push(value);
    //     }
    //     console.log(this.orderedPlantersCost);
    //   }
    // }

  }



  ngDoCheck(): void {

    //Filtering BY Payment
    let tempOrders: (any | Order)[] = [];
    if(this.cash) {
      tempOrders = [...this.pmCash]
      console.log(tempOrders);
    }
    if(this.card) {
      tempOrders = [...tempOrders, ...this.pmCard]
    }
    if(this.upi) {
      tempOrders = [...tempOrders, ...this.pmUpi]
    }

    if(!this.cash && !this.card && !this.upi) {
      tempOrders = this.orders;
    }


    // Sorting
    // this.filterOrders = this.orders;
    this.filterOrders = tempOrders;
    if (this.sortLowToHigh) {
      this.filterOrders.sort((a, b) => (a.totalCost > b.totalCost) ? 1 : -1)
    }
    if (this.sortHighToLow) {
      this.filterOrders.sort((a, b) => (a.totalCost < b.totalCost) ? 1 : -1)
    }

    this.orders = this.filterOrders

    if(this.orders.length==0){
      console.log(this.orders.length)
      this.noOrder = true;
    }
    else this.noOrder=false;


  }


  // method(): number[] {
  //   console.log(this.orders)
  //   if(this.orders){
  //     for(let i=0; i<this.orders.length; i++){
  //       let map = this.orders[i].products;

  //       for(let key of map.keys()){
  //         this.orderedPlantersId.push(key);
  //       }
  //       console.log(this.orderedPlantersId);

  //       for(let value of map.values()){
  //         this.orderedPlantersCost.push(value);
  //       }
  //       console.log(this.orderedPlantersCost);
  //     }
  //   }
  //   return this.orderedPlantersCost;
  // }

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
