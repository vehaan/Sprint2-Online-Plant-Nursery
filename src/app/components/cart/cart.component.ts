import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Cart } from 'src/app/models/Cart';
import { IPlanter } from 'src/app/models/IPlanter';
import { CartService } from 'src/app/services/cart/cart.service';
import { OrderService } from 'src/app/services/order/order.service';
import { PlanterService } from 'src/app/services/planter/planter.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  planters: IPlanter[] = [];
  cartPlanters: IPlanter[] = [];
  prodId: number[] = [];
  sub!: Subscription;
  error!: string;

  //Add Order
  addForm!: FormGroup;

  constructor(private planterService: PlanterService, private cartService: CartService, private _route: Router, private orderService: OrderService) { }

  ngOnInit(): void {

    let data = localStorage.getItem('cart');
    if(data) {
      let temp: Cart[] = JSON.parse(data);
      console.log('View cart'+ temp);
      for(let i=0; i<temp.length; i++) {
        this.planterService.getPlanterById(temp[i].id).subscribe(
          (next) => { 
                      this.cartPlanters.push(next);
                      console.log(this.cartPlanters[i]);
          },
          (err) => this.error = err
        )
      }
    }


    //this.addForm =

  }

  onSubmit(){
    
  }
  viewCart() {

  }
  checkOut(cartPlantersToOrder: IPlanter[]){
    this.orderService
    //this._route.navigate(['/order']);
  }

  deleteItem(id: number){
    
    // this.cartPlanters.splice(id, 1);
    // console.log( this.cartPlanters);
    // if(this.temp){
    // this.temp.splice(id, 1);
    // localStorage.setItem('cart', JSON.stringify(this.temp));
    // console.log(this.temp);
    // }
    console.log('deleted');
    //localStorage.setItem('cart', JSON.stringify(this.cartPlanters[] ))
  }
}


