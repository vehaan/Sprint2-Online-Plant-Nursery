import { Component, OnInit } from '@angular/core';
import { PlantService } from '../../../services/plant.service';
import { Plant } from '../plant/Plant'
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Cart } from '../../cart/cart';

@Component({
  selector: 'app-plant-list',
  templateUrl: './plant-list.component.html',
  styleUrls: ['./plant-list.component.css']
})
export class PlantListComponent implements OnInit {
  public plants!: Plant[];
  public costLowToHighPlants!:Plant[];
  public costHighToLowPlants!:Plant[];
  private error!: string
  private id: number = 0;
  private _listFilter:string='';
  public showDetails:boolean = false;
  filteredPlants:Plant[]=[];
  sub!: Subscription;
  cartProducts:Cart[] = [];

  get listFilter():string{
    return this._listFilter;
  }
  set listFilter(value:string){
      this._listFilter=value;
      console.log("in setter:",value);
      this.filteredPlants=this.performFilter(value);
  }
  

  public sort:boolean=false;
  public sortHighToLow:boolean=false;

  constructor(private service: PlantService, private router: Router) { }

  ngOnInit(): void {
    this.sub = this.service.getAllPlants().subscribe({
      next:plants=>{
        this.plants=plants;
        this.filteredPlants=this.plants;
      },
      error:err => this.error=err
    });
    }

  performFilter(filterBy:string):Plant[]{
    filterBy=filterBy.toLocaleLowerCase();
    return this.plants.filter((plant:Plant)=>
    plant.name.toLocaleLowerCase().includes(filterBy));

  }

  onEdit(plant: Plant) {
     this.router.navigate(['edit-plant', plant.id]) }

  onDelete(plant: Plant): void {
    this.service.deletePlantById(plant.id)
      .subscribe(data => {
        console.log("user deleted")
        this.plants = this.plants.filter(u => u !== plant);
      })
  };
  addPlant() {
    this.router.navigate(['add-plant'])
  }
  ascendingSort(){
    this.sort=!this.sort;
    this.sortHighToLow=false;
    console.log(this.sort);
    this.service.costLowToHigh().subscribe(
      (data)=> this.costLowToHighPlants=data,
      (err)=>this.error = err
    )
  }

  descendingSort(){
    this.sort=false;
    this.sortHighToLow=!this.sortHighToLow;
    console.log(this.sortHighToLow);
    this.service.costHighToLow().subscribe(
      (data)=> this.costHighToLowPlants=data,
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

  addToCart(plantId: number) {
     
    let prodInCart = this.saveCart();
    if(prodInCart){
      this.cartProducts = prodInCart;
    }

    let plant = this.plants.find(plant=> {
      return plant.id === plantId;
    });
    let flag = true;

    if(plant){
      this.cartProducts.forEach((value, index)=>{
          
        if(value.id === plantId) {
          let cart = this.cartProducts[index];
          cart.quantity++;
          console.log(cart.id+" Quan: "+cart.quantity);
          this.cartProducts.splice(index, 1, cart);
          flag = false;

        }

      })

      if(flag) {
        this.cartProducts.push({
          "id" : plant.id,
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