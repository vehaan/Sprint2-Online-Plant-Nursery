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
  private error!: string
  private _listFilter: string = '';
  filteredPlants: Plant[] = [];
  searchedPlants:Plant[]=[];
  sub!: Subscription;
  //qty: number = 0;
  public sortLowToHigh: boolean = false;
  public sortHighToLow: boolean = false;
  difficultyEasyBool: boolean = false;
  difficultyMediumBool: boolean = false;
  difficultyHardBool: boolean = false;
  autumnBool: boolean = false;
  winterBool: boolean = false;
  summerBool: boolean = false;
  monsoonBool: boolean = false;
  autumnPlants!: Plant[];
  winterPlants!: Plant[];
  summerPlants!: Plant[];
  monsoonPlants!: Plant[];
  DifficultyEasyPlants!: Plant[];
  DifficultyMediumPlants!: Plant[];
  DifficultyHardPlants!: Plant[];
  noPlant:boolean=false;
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    console.log("in setter:", value);
    this.searchedPlants = this.performFilter(value);
  }

  constructor(private service: PlantService, private router: Router) { }

  ngOnInit(): void {
    this.sub = this.service.getAllPlants().subscribe({
      next: plants => {
        this.plants = plants;
        this.searchedPlants = this.plants;
      },
      error: err => this.error = err
    });
  }
  ngDoCheck(): void {
    let tempPlants: (any | Plant)[] = [];
    let bloomPlants:(any | Plant)[] = [];
    if (this.difficultyEasyBool) {
      tempPlants = [...this.DifficultyEasyPlants]
    }
    if (this.difficultyMediumBool) {
      tempPlants = [...tempPlants, ...this.DifficultyMediumPlants]
    }
    if (this.difficultyHardBool) {
      tempPlants = [...tempPlants, ...this.DifficultyHardPlants]
    }
    if (this.autumnBool) {
      bloomPlants = [...this.autumnPlants]
    }
    if (this.winterBool) {
      bloomPlants = [...bloomPlants, ...this.winterPlants]
    }
    if (this.summerBool) {
      bloomPlants = [...bloomPlants, ...this.summerPlants]
    }
    if (this.monsoonBool) {
      bloomPlants = [...bloomPlants, ...this.monsoonPlants]
    }
    if((this.difficultyEasyBool || this.difficultyMediumBool || this.difficultyHardBool) && (this.autumnBool || this.winterBool || this.summerBool || this.monsoonBool)){
      let result = tempPlants.filter(o => bloomPlants.some(({id,name,}) => o.id === id && o.name === name));
      this.filteredPlants=result;
    }
    else if(this.difficultyEasyBool || this.difficultyMediumBool || this.difficultyHardBool){
      this.filteredPlants=tempPlants;
    }
    else if(this.autumnBool || this.winterBool || this.summerBool || this.monsoonBool){
      this.filteredPlants=bloomPlants;
    }
    else{
      //this.filteredPlants=this.plants;
      this.filteredPlants=this.searchedPlants;
    }
    if (this.sortLowToHigh) {
      this.filteredPlants.sort((a, b) => (a.cost > b.cost) ? 1 : -1)
    }
    if (this.sortHighToLow) {
      this.filteredPlants.sort((a, b) => (a.cost < b.cost) ? 1 : -1)
    }
    if(this.filteredPlants.length==0){
      console.log(this.filteredPlants.length)
      this.noPlant=true;
    }
    else this.noPlant=false;

    console.log("inside do check")
  }


  performFilter(filterBy: string): Plant[] {
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
    this.sortLowToHigh = !this.sortLowToHigh;
    this.sortHighToLow = false;
  }

  descendingSort() {
    this.sortLowToHigh = false;
    this.sortHighToLow = !this.sortHighToLow;
  }


  difficultyEasy() {
    this.difficultyEasyBool = !this.difficultyEasyBool;
    console.log(this.difficultyEasyBool);
    this.service.FilterByDifficulty("EASY").subscribe(
      (data) => this.DifficultyEasyPlants = data,
      (err) => this.error = err)
  }
  difficultyMedium() {
    this.difficultyMediumBool = !this.difficultyMediumBool;
    this.service.FilterByDifficulty("MEDIUM").subscribe(
      (data) => this.DifficultyMediumPlants = data,
      (err) => this.error = err)
  }
  difficultyHard() {
    this.difficultyHardBool = !this.difficultyHardBool;
    this.service.FilterByDifficulty("HARD").subscribe(
      (data) => this.DifficultyHardPlants = data,
      (err) => this.error = err)
  }
  autumn() {
    this.autumnBool = !this.autumnBool;
    this.service.FilterByBloomTime("AUTUMN").subscribe(
      (data) => this.autumnPlants = data,
      (err) => this.error = err)
  }
  winter() {
    this.winterBool = !this.winterBool;
    this.service.FilterByBloomTime("WINTER").subscribe(
      (data) => this.winterPlants = data,
      (err) => this.error = err)
  }
  summer() {
    this.summerBool = !this.summerBool;
    this.service.FilterByBloomTime("SUMMER").subscribe(
      (data) => this.summerPlants = data,
      (err) => this.error = err)
  }
  monsoon() {
    this.monsoonBool = !this.monsoonBool;
    this.service.FilterByBloomTime("MONSOON").subscribe(
      (data) => this.monsoonPlants = data,
      (err) => this.error = err)
  }
}
