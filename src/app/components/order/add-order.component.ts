import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Cart } from 'src/app/models/Cart';
import { IPlanter } from 'src/app/models/IPlanter';
import { PlanterService } from 'src/app/services/planter/planter.service';
import { PlanterComponent } from '../planter/planter.component';

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.css']
})
export class AddOrderComponent implements OnInit {
  planters: IPlanter[] = [];
  cartPlanters: IPlanter[] = [];
  prodId: number[] = [];
  sub!: Subscription;
  error!: string;
  
  constructor(private planterService: PlanterService ) { }

  ngOnInit(): void {
    let data = localStorage.getItem('cart');
    if(data) {
      let temp: Cart[] = JSON.parse(data);
      console.log('View cart'+ temp);
      for(let i=0; i<temp.length; i++) {
        this.planterService.getPlanterById(temp[i].id).subscribe(
          (next) => { 
                      this.cartPlanters.push(next);
                      console.log(this.cartPlanters[i]);
          },
          (err) => this.error = err
        )
      }
    }

    
    
  }



}
