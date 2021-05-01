import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/Auth/authentication.service';
import { OrderService } from 'src/app/services/order.service';
import { ProductService } from 'src/app/services/product.service';
import { Order } from '../order/order-list/order';
import { IProduct } from '../welcome/IProduct';
import { Cart } from './cart';



@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  limitReached : boolean[] = [];

  cartProducts: Cart[] = [];
  cartProduct: IProduct[] = [];
  error!: string;
  flag: boolean = false;
  cartFlagShow: boolean = false;
  cartFlagHide: boolean = true;

  cartProductQuantity: number[] = [];
  index: number = 0;
  order!: Order;
  quantity!: number;
  id!: number;
  totalCost : number = 0
  totalQuantity: number = 0
  paymentMode!: string

  constructor(private formBuilder: FormBuilder, private productService: ProductService, private _route: Router, private orderService: OrderService, private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
 
    let data = localStorage.getItem('cart');
    if(data) {
      let temp: Cart[] = JSON.parse(data);

      for(let i=0; i<temp.length; i++) {
        this.cartProductQuantity.push(temp[i].quantity);
        this.index = i;
        this.totalQuantity += temp[i].quantity
        this.productService.getProductById(temp[i].id).subscribe(
          (next) =>  this.cartProduct.push(next),
          (err) => this.error = err
        )
        
      }

      
    }

    if(this.cartProduct){
      for(let i=0; i<this.cartProductQuantity.length; i++){
        this.cartFlagShow = true;
        this.cartFlagHide = false;
        // console.log(this.cartProductQuantity[i]);
        
      }
      // console.log(this.cartProduct)
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

      // console.log(productObj);

      var obj = {
        transactionMode: this.paymentMode,
        products:productObj,
        customer :
          {
              id:this.authenticationService.customer.id 
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

    this._route.navigate(['/add-order']);
    
  }

  getSum():number{
    let sum = 0
    for(let i = 0; i < this.cartProduct.length; i++){
      sum += (this.cartProduct[i].cost * this.cartProductQuantity[i])
    }
    return sum
  }

  paymentMethod(mode: string):void{
    this.paymentMode = mode
  }

  saveCart() {
    //Get the data from cart(localstorage) and save it before calling AddtoCart
    let prevData = localStorage.getItem('cart');
    // console.log('prevdata'+prevData);

    if(prevData){
      let prodInCart: Cart[] = JSON.parse(prevData);
      // console.log('saved in prodInCart'+prodInCart);
      
      return prodInCart;
    }
    return null;

  }

  decQuantity(productId: number) {
    let prodInCart = this.saveCart();
    if(prodInCart){
      this.cartProducts = prodInCart;
    }

    let product = this.cartProduct.find(product=> {
      return product.id === productId;
    });
    let flag = true;

    if(product){
      this.cartProducts.forEach((value, index)=>{
          
        if(value.id === productId) {

          let cart = this.cartProducts[index];
          cart.quantity--;
          // console.log(cart.id+" Quan: "+cart.quantity);
          this.cartProducts.splice(index, 1, cart);
          flag = false;

          if(cart.quantity === 0) {
            this.deleteFromCart(productId);
          }
        }

        
        
      })

      if(flag) {
        this.cartProducts.push({
          "id" : product.id,
          "quantity": 1
        })
      }
      
      
    }

    localStorage.setItem('cart', JSON.stringify(this.cartProducts));
    window.location.reload();
  }
  
  // incQuantity(productId: number) {
     
  //   let prodInCart = this.saveCart();
  //   if(prodInCart){
  //     this.cartProducts = prodInCart;
  //   }

  //   let product = this.cartProduct.find(product=> {
  //     return product.id === productId;
  //   });
  //   let flag = true;

  //   if(product){
  //     this.cartProducts.forEach((value, index)=>{
          
  //       if(value.id === productId) {

  //         let cart = this.cartProducts[index];
  //         cart.quantity++;
  //         // console.log(cart.id+" Quan: "+cart.quantity);
  //         this.cartProducts.splice(index, 1, cart);
  //         flag = false;
  //       }

        
  //     })

  //     if(flag) {
  //       this.cartProducts.push({
  //         "id" : product.id,
  //         "quantity": 1
  //       })
  //     }
  //   }
  //   localStorage.setItem('cart', JSON.stringify(this.cartProducts));
  //   window.location.reload();
  // }

  incQuantity(productId: number) {
    
    let prodInCart = this.saveCart();
    if(prodInCart){
      this.cartProducts = prodInCart;
    }

    let product = this.cartProduct.find(product=> {
      return product.id === productId;
    });
    let flag = true;

    if(product){
      this.cartProducts.forEach((value, index)=>{
          
        if(value.id === productId) {

          let cart = this.cartProducts[index];
          if(product){
            if(cart.quantity < product.stock){
              cart.quantity++;
           }
           else{
              this.limitReached[index] = true
           }
          }
          console.log(cart.id+" Quan: "+cart.quantity);
          this.cartProducts.splice(index, 1, cart);
          flag = false;
        }

        
      })

      if(flag) {
        this.cartProducts.push({
          "id" : product.id,
          "quantity": 1
        })
      }
    }
    localStorage.setItem('cart', JSON.stringify(this.cartProducts));
    window.location.reload();
  }

  deleteFromCart(productId: number) {

    let data = localStorage.getItem('cart');
    if(data){
      this.cartProducts = JSON.parse(data);

      if(this.cartProducts) {
          this.cartProducts.forEach((value, index)=>{
          
            if(value.id === productId) {
              this.cartProducts.splice(index, 1);
            }
          })
        }
    }
    localStorage.setItem('cart', JSON.stringify(this.cartProducts));
    window.location.reload();

  }

}