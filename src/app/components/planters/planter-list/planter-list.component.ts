import { Options, LabelType } from '@angular-slider/ngx-slider';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/services/Auth/authentication.service';
import { PlanterServiceService } from 'src/app/services/planter-service.service';
import { ProductService } from 'src/app/services/product.service';
import { Cart } from '../../cart/cart';
import { Customer } from '../../customers/view-customer/customer';
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

  customer !: Customer;
  public planters!: IPlanter[];
  private error!: string
  private id: number = 0;
  public showDetails:boolean = true;
  searchText!: string;
  // filteredPlanters:IPlanter[]=[];
  sub!: Subscription;
  cartProducts:Cart[] = [];
  onlyToAdmin!:boolean;
  noPlanter = false;

  limitReached: boolean[] = [];
  index: number = 0;
  stockFlag: boolean = false;
  newFlag: boolean[] = [];

  minValue = 0;
  maxValue = 2000;
  filteredPlanters !: IPlanter[];
  allPlanters !: IPlanter[];
  
  constructor(private service: PlanterServiceService, private router: Router, public loginService: AuthenticationService) { }

  ngOnInit(): void {
    this.sub = this.service.getAllPlanters().subscribe({
      next:planters=>{
        this.planters=planters;
        this.filteredPlanters = this.planters;
        this.allPlanters = this.planters;
      },
      error:err => this.error=err
    });
    this.customer = this.loginService.getCustomer();
    this.onlyToAdmin = this.loginService.checkRole(this.customer.role);
    }

  onEdit(planter: IPlanter) {
     this.router.navigate(['edit-planter', planter.id]) }

  onDelete(planter: IPlanter): void {
    this.service.deletePlanter(planter)
      .subscribe(data => {
        console.log("user deleted")
        this.planters = this.planters.filter(u => u !== planter);
      })
      window.location.reload();
  };
  addPlanter() {
    this.router.navigate(['add-planter'])
  }


  toggleDetails(){
    this.showDetails = ! this.showDetails
  }

 
 filterRange(){
   this.filteredPlanters = this.allPlanters;
   this.filteredPlanters = this.filteredPlanters.filter(u => u.cost > this.minValue && u.cost < this.maxValue);
    this.planters = this.filteredPlanters;
    if (this.planters.length === 0){
      this.noPlanter = true;
    }
  }

  options: Options = {
    floor: 0,
    ceil: 2000,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return '<b>Min price:</b> Rs. ' + value;
        case LabelType.High:
          return '<b>Max price:</b> Rs. ' + value;
        default:
          return 'Rs. ' + value;
      }
    }
  };

  ascendingSort(){
    this.planters.sort((a,b) => (a.cost) - (b.cost));
  }

  descendingSort(){
    this.planters.sort((a,b) => (b.cost) - (a.cost));
  }

  ngDoCheck(): void {
    if(this.planters) {
      for(let i=0; i<this.planters.length; i++) {
        
        if(this.newFlag[i] != false) {
          this.newFlag[i] = true;
        }
      }
      
    }
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

  addToCart(planterId: number, num: number) {

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

      if(this.planters) {
        for(let i=0; i<this.planters.length; i++) {
      
          if(this.newFlag[i] != false) {
            this.newFlag[i] = true;
          }
        }
    
      }
      this.newFlag[num] = false;

    }
    ProductService.badgeNumber++;
    localStorage.setItem('cart', JSON.stringify(this.cartProducts));
  
  }

  // goToCart() {
  //   this.router.navigate(['/cart']);
  // }
}
