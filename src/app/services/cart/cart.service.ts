import { EventEmitter, Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { IPlanter } from 'src/app/models/IPlanter';

@Injectable({
  providedIn: 'root'
})
export class CartService {
//Service is common to both AddCart and Planter components
  
  // invokeMethod = new EventEmitter();
  // //subsVar!: Subscription;

  // constructor() { }

  // addToCartButtonClick() {
  //   this.invokeMethod
  // }
  cartProducts : Map<number, number> = new Map<number, number>();
  planter!: IPlanter;
  
  constructor() { }

  // addToCart(): void { //Add to Cart
  //   this.cartProducts.set(this.planter.id, 1);
  // }

  // addToOrder(): Map<number, number> { //For Checkout Button
  //   return this.cartProducts;
  // }

  
}
