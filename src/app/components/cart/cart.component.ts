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
import { ProductService } from 'src/app/services/product/product.service';
import { PlanterComponent } from '../planter/planter.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartProducts: Cart[] = [];
  cartPlanters: IPlanter[] = [];
  error!: string;
  flag: boolean = false;
  cartFlagShow: boolean = false;
  cartFlagHide: boolean = true;
  stockFlag: boolean = false;

  cartProductQuantity: number[] = [];
  index: number = 0;
  order!: Order;
  quantity!: number;
  id!: number;
  totalCost : number = 0
  totalQuantity: number = 0
  paymentMode!: string
  limitReached: boolean[] = [];

  constructor(private formBuilder: FormBuilder, private planterService: PlanterService, private _route: Router, private orderService: OrderService) { }

  ngOnInit(): void {
 
    let data = localStorage.getItem('cart');
    if(data) {
      let temp: Cart[] = JSON.parse(data);

      for(let i=0; i<temp.length; i++) {
        this.cartProductQuantity.push(temp[i].quantity);
        this.index = i;
        this.totalQuantity += temp[i].quantity
        this.planterService.getPlanterById(temp[i].id).subscribe(
          (next) =>  this.cartPlanters.push(next),
          (err) => this.error = err
        )
        
      }

    }

    if(this.cartPlanters){
      for(let i=0; i<this.cartProductQuantity.length; i++){
        this.cartFlagShow = true;
        this.cartFlagHide = false;
        
      }
      
    }

  }

  onSubmit(){
    let cartArray = localStorage.getItem('cart')
    
    let cartArrayParsed: Cart[]

    if(cartArray){
      var productsMap = new Map()
     
      cartArrayParsed = JSON.parse(cartArray)

      for(let i=0; i<cartArrayParsed.length; i++){
        productsMap.set(cartArrayParsed[i].id, cartArrayParsed[i].quantity)
        
      }
      let productObj = Array.from(productsMap).reduce((obj,[key,value])=>(
        Object.assign(obj,{[key]:value})
      ),{})

      console.log(productObj);

      var obj = {
        transactionMode: this.paymentMode,
        products:productObj,
        customer :
          {
              id:204
          }
      } 
      
      // Sending the order object to database 
      var json = JSON.stringify(obj);
      this.orderService.addOrder(JSON.parse(json)).subscribe(
        data => this.order = data,
        err => console.log(err)
      )
    }

    localStorage.removeItem('cart');

    this._route.navigate(['/addorder']);
    
  }

  getSum():number{
    let sum = 0
    for(let i = 0; i < this.cartPlanters.length; i++){
      sum += (this.cartPlanters[i].cost * this.cartProductQuantity[i])
    }
    return sum
  }

  paymentMethod(mode: string):void{
    this.paymentMode = mode
  }

  saveCart() {
    //Get the data from cart(localstorage) and save it before calling AddtoCart
    let prevData = localStorage.getItem('cart');

    if(prevData){
      let prodInCart: Cart[] = JSON.parse(prevData);
      
      return prodInCart;
    }
    return null;

  }

  decQuantity(planterId: number) {
    let prodInCart = this.saveCart();
    if(prodInCart){
      this.cartProducts = prodInCart;
    }

    let planter = this.cartPlanters.find(planter=> {
      return planter.id === planterId;
    });
    let flag = true;

    if(planter){
      this.cartProducts.forEach((value, index)=>{
          
        if(value.id === planterId) {

          let cart = this.cartProducts[index];
          cart.quantity--;
          this.cartProducts.splice(index, 1, cart);
          flag = false;

          if(cart.quantity === 0) {
            this.deleteFromCart(planterId);
          }
        }

        
        
      })

      if(flag) {
        this.cartProducts.push({
          "id" : planter.id,
          "quantity": 1
        })
      }
      
      
    }

    // badge--;
    ProductService.badgeNumber--;
    console.log(ProductService.badgeNumber);
    localStorage.setItem('cart', JSON.stringify(this.cartProducts));
    window.location.reload();
  }
  
  incQuantity(planterId: number) {
     
    let prodInCart = this.saveCart();
    if(prodInCart){
      this.cartProducts = prodInCart;
    }

    let planter = this.cartPlanters.find(planter=> {
      return planter.id === planterId;
    });
    let flag = true;

    if(planter){
      this.cartProducts.forEach((value, index)=>{
          
        if(value.id === planterId) {

          let cart = this.cartProducts[index];
          // cart.quantity++;
          if(planter){
            if(cart.quantity < planter.stock){
              cart.quantity++;
              this.stockFlag = true;
            }
            else{
              this.limitReached[index] = true
            }
            this.cartProducts.splice(index, 1, cart);
            flag = false;
          }
      }

        
      })

      if(flag) {
        this.cartProducts.push({
          "id" : planter.id,
          "quantity": 1
        })
      }
    }
    
    ProductService.badgeNumber++;
    localStorage.setItem('badgeCount', JSON.stringify(ProductService.badgeNumber));
    console.log(ProductService.badgeNumber);
    // PlanterComponent.badgeOfProducts++;
    // console.log(PlanterComponent.badgeOfProducts);
    localStorage.setItem('cart', JSON.stringify(this.cartProducts));
    if(this.stockFlag){
      window.location.reload();
    }
    
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
    // PlanterComponent.badgeOfProducts--;
    // console.log(PlanterComponent.badgeOfProducts);
    localStorage.setItem('cart', JSON.stringify(this.cartProducts));
    window.location.reload();
  }

}