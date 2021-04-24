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
  //order!: Order;

  //Add Order
  //addForm!: FormGroup;
  

  constructor(private formBuilder: FormBuilder, private planterService: PlanterService, private _route: Router, private orderService: OrderService) { }

  ngOnInit(): void {
    //this.index = 0;
    let data = localStorage.getItem('cart');
    if(data) {
      let temp: Cart[] = JSON.parse(data);

      for(let i=0; i<temp.length; i++) {
        this.cartProductQuantity.push(temp[i].quantity);
        this.index++;

        this.planterService.getPlanterById(temp[i].id).subscribe(
          (next) =>  this.cartPlanters.push(next),
          (err) => this.error = err
        )
      }
    }


    // this.addForm = this.formBuilder.group({
    //   transactionMode: ['', Validators.required],

    // })


    let k = 0;

    for(let i=0; i<this.cartProductQuantity.length; i++){
      console.log(this.cartProductQuantity[i]);
    }

  }

  showQuantity() : void{
    
  }

//To delete item from cart
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
  }

  onAddOrder(){
    // var obj = {
    // "transactionMode": "CARD",
    //       "products" :
    //         {

    //             "21" : 2   
    //         },
    //         "customer" :
    //         {
    //             "id":202        
    //         }
    //     }  
        
    //   var json = JSON.stringify(obj);
    //   console.log(json)
    //   this.orderService.addOrder(JSON.parse(json))
    //   .subscribe(
    //     data => this.order = data,
    //     err => console.log(err)
    //   )
      //return this.http.post('http://localhost:9191/onlineplantnursery/products/admin/order',JSON.parse(json));
  }

  viewCart() {

  }
  checkOut(cartPlantersToOrder: IPlanter[]){
    //this.orderService
    //this._route.navigate(['/order']);
  }

}


