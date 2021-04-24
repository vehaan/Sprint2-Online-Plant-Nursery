import { Component, OnInit } from '@angular/core';
import { PlantService } from './plant.service';
import { Plant } from './Plant'
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PlantComponent } from './plant.component';

@Component({
  selector: 'app-plant-list',
  templateUrl: './plant-list.component.html',
  styleUrls: ['./plant-list.component.css']
})
export class PlantListComponent implements OnInit {
  public plants!: Plant[];
  public costLowToHighPlants!: Plant[];
  public costHighToLowPlants!: Plant[];
  private error!: string
  private id: number = 0;
  private _listFilter: string = '';
  public showDetails: boolean = true;
  filteredPlants: Plant[] = [];
  sub!: Subscription;
  qty: number = 0;
  difficultyEasyBool: boolean = false;
  difficultyMediumBool: boolean = false;
  difficultyHardBool: boolean = false;

  cartMap = new Map();
  DifficultyEasyPlants!: Plant[];
  DifficultyMediumPlants!: Plant[];
  DifficultyHardPlants!: Plant[];

  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    console.log("in setter:", value);
    this.filteredPlants = this.performFilter(value);
  }


  public sort: boolean = false;
  public sortHighToLow: boolean = false;

  constructor(private service: PlantService, private router: Router) { }

  ngOnInit(): void {
    this.sub = this.service.getAllPlants().subscribe({
      next: plants => {
        this.plants = plants;
        this.filteredPlants = this.plants;
      },
      error: err => this.error = err
    });
  }
  ngDoCheck(): void {
    if (this.difficultyEasyBool) {
      this.filteredPlants = this.DifficultyEasyPlants;
    }
    if (this.difficultyMediumBool) {
      this.filteredPlants = this.DifficultyMediumPlants;
    }
    if (this.difficultyHardBool) {
      this.filteredPlants = this.DifficultyHardPlants;
    }
    if (this.difficultyEasyBool && this.difficultyMediumBool) {
      this.filteredPlants = [...this.DifficultyEasyPlants, ...this.DifficultyMediumPlants];
    }
    if (this.difficultyEasyBool && this.difficultyHardBool) {
      this.filteredPlants = [...this.DifficultyEasyPlants, ...this.DifficultyHardPlants];
    }
    if (this.difficultyMediumBool && this.difficultyHardBool) {
      this.filteredPlants = [...this.DifficultyMediumPlants, ...this.DifficultyHardPlants];
    }
    if (this.difficultyMediumBool && this.difficultyEasyBool && this.difficultyHardBool) {
      this.filteredPlants = this.plants;
    }

    if (!this.difficultyMediumBool && !this.difficultyEasyBool && !this.difficultyHardBool) {
      this.filteredPlants = this.plants;
    }
    if(this.sort){
      this.filteredPlants.sort((a,b)=>(a.cost>b.cost)?1:-1)
    }
    if(this.sortHighToLow){
      this.filteredPlants.sort((a,b)=>(a.cost<b.cost)?1:-1)
    }


    console.log("inside do check")
  }


  performFilter(filterBy: string): Plant[] {
    if (this.sort == true) {
      filterBy = filterBy.toLocaleLowerCase();
      return this.costLowToHighPlants.filter((plant: Plant) =>
        plant.commonName.toLocaleLowerCase().includes(filterBy));
    }
    else if (this.sortHighToLow == true) {
      filterBy = filterBy.toLocaleLowerCase();
      return this.costHighToLowPlants.filter((plant: Plant) =>
        plant.commonName.toLocaleLowerCase().includes(filterBy));
    }
    filterBy = filterBy.toLocaleLowerCase();
    return this.plants.filter((plant: Plant) =>
      plant.commonName.toLocaleLowerCase().includes(filterBy));

  }

  onEdit(plant: Plant) {
    this.router.navigate(['edit-plant', plant.id])
  }

  onDelete(plant: Plant): void {
    this.service.deletePlantById(plant.id)
      .subscribe(data => {
        console.log("user deleted")
        this.plants = this.plants.filter(u => u !== plant);
      })
    this.router.navigate(['plants'])
  };
  addPlant() {
    this.router.navigate(['add-plant'])
  }
  ascendingSort() {
    this.sort = !this.sort;
    this.sortHighToLow = false;
    /*console.log(this.sort);
    this.service.costLowToHigh().subscribe(
      (data) => this.costLowToHighPlants = data,
      (err) => this.error = err
    )*/
  }

  descendingSort() {
    this.sort = false;
    this.sortHighToLow = !this.sortHighToLow;
    /*console.log(this.sortHighToLow);
    this.service.costHighToLow().subscribe(
      (data) => this.costHighToLowPlants = data,
      (err) => this.error = err
    )*/
  }
  toggleDetails() {
    this.showDetails = !this.showDetails
  }
  addToCart(id2: number) {
    this.qty = this.qty + 1
    this.cartMap.set(id2, this.qty);
    console.log(id2, this.cartMap.get(id2))

  }
  difficultyEasy() {


    this.difficultyEasyBool = !this.difficultyEasyBool;
    console.log(this.difficultyEasyBool);
    this.service.FilterByDifficulty("EASY").subscribe(
      (data) => this.DifficultyEasyPlants = data,
      (err) => this.error = err
    )

  }
  difficultyMedium() {

    console.log("Medium chosen");
    this.difficultyMediumBool = !this.difficultyMediumBool;
    this.service.FilterByDifficulty("MEDIUM").subscribe(
      (data) => this.DifficultyMediumPlants = data,
      (err) => this.error = err
    )

  }
  difficultyHard() {

    console.log("Hard chosen");
    this.difficultyHardBool = !this.difficultyHardBool;
    this.service.FilterByDifficulty("HARD").subscribe(
      (data) => this.DifficultyHardPlants = data,
      (err) => this.error = err
    )

  }
}
