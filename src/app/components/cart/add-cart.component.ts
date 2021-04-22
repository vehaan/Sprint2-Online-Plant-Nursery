import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { IPlanter } from 'src/app/models/IPlanter';
import { CartService } from 'src/app/services/cart/cart.service';
import { PlanterService } from 'src/app/services/planter/planter.service';

@Component({
  selector: 'app-add-cart',
  templateUrl: './add-cart.component.html',
  styleUrls: ['./add-cart.component.css']
})
export class AddCartComponent implements OnInit {

  planter!: IPlanter[];
  cartProducts : any | Map<number, number> /* = new Map<number, number>() */ ;

  isAdded: boolean = false;
  router: any;

  constructor(private _activatedRoute: ActivatedRoute, private planterService: PlanterService, private cartservice: CartService ) { }

  ngOnInit(): void {
    this.cartProducts =  this.planterService.getAllPlanters().subscribe(
      (data) => { this.planter = data; },
      (err)=>console.log(err)
    );

  }

  addToCart(planterId: number): any { //For Add to cart button
    console.log('Hello'+planterId);
    //this.cartProducts.set(planterId, 1);
    let prod = this.cartProducts.find((prod: { id: number; }) => {
      //return prod.id === +prod.id;
    });
    let cartData = [];
    let data = localStorage.getItem('cart');
    if (data !== null) {
      cartData = JSON.parse(data);
    }
    cartData.push(prod);
    this.updateCartData(cartData);

    localStorage.setItem('cart', JSON.stringify(cartData));

    //prod.isAdded = true;
  }

  updateCartData(cartProducts: any) {
    this.cartProducts = cartProducts;
  }

  goToCart() {
    this.router.navigate(['/cart']);
  }

  emptyCart() {
    this.cartProducts = [];
    localStorage.clear();
  }

  addToOrder(): Map<number, number> { //For Checkout Button
   return this.cartProducts;
  }

}
