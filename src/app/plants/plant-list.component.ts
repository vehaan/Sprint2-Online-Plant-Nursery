import { Component, OnInit } from '@angular/core';
import { PlantService } from './plant.service';
import { Plant } from './Plant'
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

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
    plant.commonName.toLocaleLowerCase().includes(filterBy));

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
}
