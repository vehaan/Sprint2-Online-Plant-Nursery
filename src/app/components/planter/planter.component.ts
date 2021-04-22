import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IPlanter } from 'src/app/models/IPlanter';
import { PlanterService } from 'src/app/services/planter/planter.service';
import { CartService } from 'src/app/services/cart/cart.service';
import { Cart } from 'src/app/models/Cart';

@Component({
  selector: 'app-planter',
  templateUrl: './planter.component.html',
  styleUrls: ['./planter.component.css']
})
export class PlanterComponent implements OnInit {

  private error!: string
  @Input() showDetails!: boolean;
  planters!: IPlanter[];

  //Cart Elements ---------------------------------------------
  //cartProducts = new Map();
  // prodId: number[] = [];
  // prodQuan:number[] = [];
  cartProducts:Cart[] = [];

  constructor(private service:PlanterService, private cartService: CartService, private router:Router) {  }

  ngOnInit(): void {
     this.service.getAllPlanters().subscribe(
      (data)=>this.planters = data,
      (err)=>this.error = err
    );
    
  }

  deletePlanter(planter: IPlanter): void{
    this.service.deletePlanter(planter).subscribe( data => {
      this.planters = this.planters.filter(p => p !== planter);
    })
  }

  //Cart methods--------------------------------------------
  addToCart(id: number) {
    let planter = this.planters.find(planter=> {
      return planter.id === id;
    });

    if(planter){
      // this.prodId.push(planter?.id);
      // this.prodQuan.push(1);
      this.cartProducts.push({
        "id" :planter?.id, 
        "quantity": 1
      })
    }
    localStorage.setItem('cart', JSON.stringify(this.cartProducts));
    //localStorage.setItem('id', JSON.stringify(this.prodId));
    //localStorage.setItem('quan', JSON.stringify(this.prodQuan));

    //console.log(localStorage.getItem('id'));
    //console.log(localStorage.getItem('quan'));

  }

  // updateCartData(cartData: Map<number, number>) {
  //   this.cartProducts = cartData;
  // }

  goToCart() {
    this.router.navigate(['/cart']);
  }

  emptyCart() {
    // this.prodId = [];
    // this.prodQuan = [];
    this.cartProducts = [];
    localStorage.clear();
  }

  // addToOrder(): Map<number, number> { //For Checkout Button
  //  return this.cartProducts;
  // }

}