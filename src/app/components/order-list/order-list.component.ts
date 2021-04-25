import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { PlanterServiceService } from 'src/app/services/planter-service.service';
import { IPlanter } from '../planters/planter/IPlanter';
import { Order } from './order';


@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {

  private error!: string;
  orders!: Order[];
  objArray!: Object[];
  orderedPlanters!: IPlanter[];
  // orderedProductsMap!: Map<number, number>;
  orderedPlantersId!: number[];
  orderedPlantersCost!: number[];

  constructor(private orderService: OrderService, private planterService: PlanterServiceService ) { }

  ngOnInit(): void {
    this.orderService.getAllCustomerOrders(205).subscribe(
      (data) => {
        this.orders = data;
        this.objArray = JSON.parse(JSON.stringify(this.orders)) 
        console.log(data);
        console.log(this.orders);
        console.log(JSON.stringify(this.orders))
      },
      (err) => this.error = err
    );
    
    console.log(this.orders)

    if(this.orders){
      for(let i=0; i<this.orders.length; i++){
        let map = this.orders[i].products;

        for(let key of map.keys()){
          this.orderedPlantersId.push(key);
        }
        console.log(this.orderedPlantersId);

        for(let value of map.values()){
          this.orderedPlantersCost.push(value);
        }
        console.log(this.orderedPlantersCost);
      }
    }

  }


  method(): number[] {
    console.log(this.orders)
    if(this.orders){
      for(let i=0; i<this.orders.length; i++){
        let map = this.orders[i].products;

        for(let key of map.keys()){
          this.orderedPlantersId.push(key);
        }
        console.log(this.orderedPlantersId);

        for(let value of map.values()){
          this.orderedPlantersCost.push(value);
        }
        console.log(this.orderedPlantersCost);
      }
    }
    return this.orderedPlantersCost;
  }

}