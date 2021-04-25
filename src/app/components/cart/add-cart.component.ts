import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { Cart } from 'src/app/models/Cart';
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

  //cartProducts:Cart[] = [];
  isAdded: boolean = false;
  router: any;

  constructor(private _activatedRoute: ActivatedRoute, private planterService: PlanterService, private cartservice: CartService ) { }

  ngOnInit(): void {
    this.cartProducts =  this.planterService.getAllPlanters().subscribe(
      (data) => { this.planter = data; },
      (err)=>console.log(err)
    );

  }


}
