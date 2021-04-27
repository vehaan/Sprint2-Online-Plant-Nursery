import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/Auth/authentication.service';
import { OrderService } from 'src/app/services/order.service';
import { ProductService } from 'src/app/services/product.service';
import { Order } from '../order-list/order';
import { IProduct } from '../../welcome/IProduct';



@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.css']
})
export class AddOrderComponent implements OnInit {
  products: IProduct[] = [];
  cartProducts: IProduct[] = [];
  prodId: number[] = [];

  orders!: Order[];
  order!: Order;
  error!: string;
  
  constructor(private productService: ProductService, private orderService: OrderService, private _router: Router, private authenticationService: AuthenticationService) { }

  //Need to refresh to see the recently placed order
  ngOnInit(): void {
    this.orderService.getAllCustomerOrders(this.authenticationService.customer.id).subscribe(
      (data) => {
        this.orders = data;
        // console.log(this.orders);
      },
      (err) => this.error = err
    );

    if(this.orders) {
      this.order = this.orders[0];
      // console.log(this.order);
    }
  }

  continueShopping() {
    this._router.navigate(['/welcome']); 
    //For now, navigating to Planter List
    //Navigate to Home Page after including it.
  }


}