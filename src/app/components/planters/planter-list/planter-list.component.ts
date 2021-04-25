import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PlanterServiceService } from 'src/app/services/planter-service.service';
import { Cart } from '../../cart/cart';
import { IPlanter } from '../planter/IPlanter';

@Component({
  selector: 'app-planter-list',
  templateUrl: './planter-list.component.html',
  styleUrls: ['./planter-list.component.css']
})
export class PlanterListComponent implements OnInit {

  // private error! : string
  // details = true;
  // private _listFilter!:string;
  // tempPlanters!: IPlanter[];
  // public filteredPlanters:IPlanter[] = [];
    
  // sortOptions = [
  //   "Relevance","Price--Low To High","Price--High To Low"
  // ]

  // sortBy = this.sortOptions[0];

  // constructor(private service:PlanterServiceService, private router:Router) { }

  // ngOnInit(): void {
  //   this.service.getAllPlanters().subscribe(
  //     (data)=>this.tempPlanters = data,
  //     (err)=>this.error = err
  //   ) 
  // }

  // toggleDetails(): void {
  //   this.details = !this.details;
  // }

  // updateSortBy(){
  //   console.log(document.getElementById("price")?.nodeValue);
  // }

  // get listFilter(): string {
  //   return this._listFilter;
  // }

  // set listFilter(value: string) {
  //   this._listFilter = value;
  //   console.log('In setter:', value);
  //   this.tempPlanters = this.performFilter(value);
  // }

  // performFilter(filterBy: string): IPlanter[] {
  
  //   filterBy = filterBy.toLocaleLowerCase();
  //   return this.tempPlanters.filter((planter: IPlanter) =>
  //     planter.color.toLocaleLowerCase().includes(filterBy));
  // }

  
  public planters!: IPlanter[];
  public costLowToHighPlanters!:IPlanter[];
  public costHighToLowPlanters!:IPlanter[];
  private error!: string
  private id: number = 0;
  private _listFilter:string='';
  public showDetails:boolean = false;
  filteredPlanters:IPlanter[]=[];
  sub!: Subscription;
  cartProducts:Cart[] = [];

  get listFilter():string{
    return this._listFilter;
  }
  set listFilter(value:string){
      this._listFilter=value;
      console.log("in setter:",value);
      this.filteredPlanters=this.performFilter(value);
  }
  

  public sort:boolean=false;
  public sortHighToLow:boolean=false;

  constructor(private service: PlanterServiceService, private router: Router) { }

  ngOnInit(): void {
    this.sub = this.service.getAllPlanters().subscribe({
      next:planters=>{
        this.planters=planters;
        this.filteredPlanters=this.planters;
      },
      error:err => this.error=err
    });
    }

  performFilter(filterBy:string):IPlanter[]{
    filterBy=filterBy.toLocaleLowerCase();
    return this.planters.filter((planter:IPlanter)=>
    planter.name.toLocaleLowerCase().includes(filterBy));

  }

  onEdit(planter: IPlanter) {
     this.router.navigate(['edit-planter', planter.id]) }

  onDelete(planter: IPlanter): void {
    this.service.deletePlanter(planter)
      .subscribe(data => {
        console.log("user deleted")
        this.planters = this.planters.filter(u => u !== planter);
      })
  };
  addPlanter() {
    this.router.navigate(['add-planter'])
  }
  ascendingSort(){
    this.sort=!this.sort;
    this.sortHighToLow=false;
    console.log(this.sort);
    this.service.costLowToHigh().subscribe(
      (data)=> this.costLowToHighPlanters=data,
      (err)=>this.error = err
    )
  }

  descendingSort(){
    this.sort=false;
    this.sortHighToLow=!this.sortHighToLow;
    console.log(this.sortHighToLow);
    this.service.costHighToLow().subscribe(
      (data)=> this.costHighToLowPlanters=data,
      (err)=>this.error = err   
    )
  }
  toggleDetails(){
    this.showDetails = ! this.showDetails
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

  // goToCart() {
  //   this.router.navigate(['/cart']);
  // }
}
