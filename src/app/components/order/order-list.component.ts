import { Component, OnInit } from '@angular/core';
import { IPlanter } from 'src/app/models/IPlanter';
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
  objArray!: Object[];
  orderedPlanters!: IPlanter[];
  // orderedProductsMap!: Map<number, number>;
  orderedPlantersId!: number[];
  orderedPlantersCost!: number[];

  constructor(private orderService: OrderService, private planterService: PlanterService ) { }

  ngOnInit(): void {
    this.orderService.getAllCustomerOrders(202).subscribe(
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
