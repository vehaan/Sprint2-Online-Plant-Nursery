import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IPlanter } from 'src/app/models/IPlanter';
import { PlanterService } from 'src/app/services/planter/planter.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  planters: IPlanter[] = [];
  prodId: number[] = [];
  sub!: Subscription;
  constructor(private planterService: PlanterService) { }

  ngOnInit(): void {
    this.planterService.getAllPlanters().subscribe(
      (data)=>this.planters = data,
      //(err)=>this.error = err
    );
    for(let val of this.prodId){
    
    }

    //console.log(this.cartProducts);
  }
  

  viewCart() {

  }
}
