import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IPlanter } from 'src/app/models/IPlanter';
import { Order } from 'src/app/models/order';
import { OrderService } from 'src/app/services/order/order.service';
import { ProductService } from 'src/app/services/product/product.service';


@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.css']
})
export class AddOrderComponent implements OnInit {
  planters: IPlanter[] = [];
  cartPlanters: IPlanter[] = [];
  prodId: number[] = [];

  orders!: Order[];
  order!: Order;
  error!: string;
  
  constructor(private productService: ProductService, private orderService: OrderService, private _router: Router) { }

  //Need to refresh to see the recently placed order
  ngOnInit(): void {
    this.orderService.getAllCustomerOrders(203).subscribe(
      (data) => {
        this.orders = data;
        console.log(this.orders);
      },
      (err) => this.error = err
    );
      
    if(this.orders) {
      this.order = this.orders[0];
      console.log(this.order);
    }
  }

  continueShopping() {
    this._router.navigate(['/planter-list']); 
    //For now, navigating to Planter List
    //Navigate to Home Page after including it.
  }


}
