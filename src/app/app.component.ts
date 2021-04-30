import { variable } from '@angular/compiler/src/output/output_ast';
import { Component, DoCheck, OnInit } from '@angular/core';
import { PlanterComponent } from './components/planter/planter.component';
import { ProductService } from './services/product/product.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Online Plant Nursery';
  temp!: number ;


  constructor() { }

  ngOnInit(): void {
    this.temp = ProductService.badgeNumber;
    // this.temp = localStorage.getItem('cart')?.length
    // console.log(this.temp);
  }

  ngDoCheck(): void {
    this.temp = ProductService.badgeNumber;
    // this.temp = localStorage.getItem('cart')?.length

  }

}
