import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Cart } from 'src/app/models/Cart';
import { IPlanter } from 'src/app/models/IPlanter';
import { Order } from 'src/app/models/order';
import { CartService } from 'src/app/services/cart/cart.service';
import { OrderService } from 'src/app/services/order/order.service';
import { PlanterService } from 'src/app/services/planter/planter.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartProducts: Cart[] = [];
  cartPlanters: IPlanter[] = [];
  error!: string;

  cartProductQuantity: number[] = [];
  index: number = 0;
  order!: Order;
  quantity!: number;
  id!: number;

  constructor(private formBuilder: FormBuilder, private planterService: PlanterService, private _route: Router, private orderService: OrderService) { }

  ngOnInit(): void {
 
    let data = localStorage.getItem('cart');
    if(data) {
      let temp: Cart[] = JSON.parse(data);

      for(let i=0; i<temp.length; i++) {
        this.cartProductQuantity.push(temp[i].quantity);
        this.index = i;

        this.planterService.getPlanterById(temp[i].id).subscribe(
          (next) =>  this.cartPlanters.push(next),
          (err) => this.error = err
        )
      }
    }

    let k = 0;

    for(let i=0; i<this.cartProductQuantity.length; i++){
      console.log(this.cartProductQuantity[i]);
    }

  }

  onSubmit(){
    let cartArray = localStorage.getItem('cart')
    //console.log('Cart Items'+cartArray)
    let cartArrayParsed: Cart[]

    if(cartArray){
      var productsMap = new Map()
     
      cartArrayParsed = JSON.parse(cartArray)

      for(let i=0; i<cartArrayParsed.length; i++){
        productsMap.set(cartArrayParsed[i].id, cartArrayParsed[i].quantity)
        
      }

      //console.log(productsMap);
      // this.id = cartArrayParsed[0].id
      // this.quantity = cartArrayParsed[0].quantity

      let productObj = Array.from(productsMap).reduce((obj,[key,value])=>(
        Object.assign(obj,{[key]:value})
      ),{})

      console.log(productObj);

      var obj = {
        transactionMode: "CARD",
        products:productObj,
        customer :
          {
              id:202            
          }
      } 

      var json = JSON.stringify(obj);
      console.log(obj)
      this.orderService.addOrder(JSON.parse(json))
      .subscribe(
        data => this.order = data,
        err => console.log(err)
      ) 
    }

    //localStorage.removeItem('cart');
    
  }
  
  deleteFromCart(planterId: number) {

    let data = localStorage.getItem('cart');
    if(data){
      this.cartProducts = JSON.parse(data);

      if(this.cartProducts) {
          this.cartProducts.forEach((value, index)=>{
          
            if(value.id === planterId) {
              this.cartProducts.splice(index, 1);
            }
          })
        }
    }
    localStorage.setItem('cart', JSON.stringify(this.cartProducts));

    //Need to do refresh
    //this._route.navigate(['cart']);
  }

}


