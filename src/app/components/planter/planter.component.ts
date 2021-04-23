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
  cartProducts:Cart[] = [];
  glob:number = 0;
  constructor(private service:PlanterService, private cartService: CartService, private router:Router) {  }

  ngOnInit(): void {
     this.service.getAllPlanters().subscribe(
      (data)=>this.planters = data,
      (err)=>this.error = err
    );

    console.log('In ng' + localStorage.getItem('cart'));
    
  }

  deletePlanter(planter: IPlanter): void{
    this.service.deletePlanter(planter).subscribe( data => {
      this.planters = this.planters.filter(p => p !== planter);
    })
  }

  //Cart methods--------------------------------------------
  saveCart() {
    //Get the data from cart(localstorage) and save it before calling AddtoCart
    let prevData = localStorage.getItem('cart');
    console.log('prevdata'+prevData);

    if(prevData){
      let prodInCart: Cart[] = JSON.parse(prevData);
      console.log('saved in prodInCart'+prodInCart);
      
      return prodInCart;
    }
    return null;

  }
  addToCart(id: number) {
     
    let prodInCart = this.saveCart();
    if(prodInCart){
      this.cartProducts = prodInCart;
    }

    let planter = this.planters.find(planter=> {
      return planter.id === id;
    });

    if(planter){
      this.cartProducts.push({
        "id" :planter?.id,
        "quantity": 1
      })
    }

    localStorage.setItem('cart', JSON.stringify(this.cartProducts));
    
  }

  deleteFromCart(id: number){
    let prodInCart = this.saveCart();
    if(prodInCart){
      this.cartProducts = prodInCart;

      let planter = this.planters.find(planter=> {
        return planter.id === id;
      });
  
      if(planter){
        //let deletePlanter = this.cartProducts.findIndex() //
          //Need to write LOGIC
      }

    }
    localStorage.removeItem('cart'); //Problem Again :(
  }

  goToCart() {
    this.router.navigate(['/cart']);
  }


  emptyCart() {
    localStorage.clear();
  }

  // addToOrder(): Map<number, number> { //For Checkout Button
  //  return this.cartProducts;
  // }

}