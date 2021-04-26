import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IPlanter } from 'src/app/models/IPlanter';
import { PlanterService } from 'src/app/services/planter/planter.service';
import { Cart } from 'src/app/models/Cart';

@Component({
  selector: 'app-planter',
  templateUrl: './planter.component.html',
  styleUrls: ['./planter.component.css']
})
export class PlanterComponent implements OnInit {

  private error!: string;
  @Input() showDetails!: boolean;
  planters!: IPlanter[];

  //Cart Elements ---------------------------------------------
  cartProducts:Cart[] = [];

  constructor(private service:PlanterService, private router:Router) {  }

  ngOnInit(): void {
    this.service.getAllPlanters().subscribe(
      (data)=>this.planters = data,
      (err)=>this.error = err
    );
    
  }

  deletePlanter(planter: IPlanter): void {
    this.service.deletePlanter(planter).subscribe( data => {
      this.planters = this.planters.filter(p => p !== planter);
    })
  }

  //Cart methods--------------------------------------------
  saveCart() {
    let prevData = localStorage.getItem('cart');
    console.log('prevdata'+prevData);

    if(prevData){
      let prodInCart: Cart[] = JSON.parse(prevData);
      console.log('saved in prodInCart'+prodInCart);
      
      return prodInCart;
    }
    return null;

  }

  addToCart(planterId: number) {
     
    let prodInCart = this.saveCart();
    if(prodInCart){
      this.cartProducts = prodInCart;
    }

    let planter = this.planters.find(planter=> {
      return planter.id === planterId;
    });
    let flag = true;

    if(planter){
      this.cartProducts.forEach((value, index)=>{
          
        if(value.id === planterId) {
          let cart = this.cartProducts[index];
          //if() //Add validation code


          cart.quantity++;
          console.log(cart.id+" Quan: "+cart.quantity);
          this.cartProducts.splice(index, 1, cart);
          flag = false;

        }

      })

      if(flag) {
        this.cartProducts.push({
          "id" : planter.id,
          "quantity": 1
        })
      }
      
    }

    localStorage.setItem('cart', JSON.stringify(this.cartProducts));
    
  }

}