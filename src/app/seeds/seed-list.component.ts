import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Seed } from './Seed';
import { SeedService } from './seed.service';

@Component({
  selector: 'app-seed-list',
  templateUrl: './seed-list.component.html',
  styleUrls: ['./seed-list.component.css']
})
export class SeedListComponent implements OnInit {
  
  // public sort:boolean = false;
  public seeds!: Seed[];
  private error!: string;
  private id: number = 0;
  public seedsCostLowToHigh!: Seed[];
  public seedsCostHighToLow!: Seed[];
  public showDetails:boolean = false;
  private _listFilter:string ='';
  public filteredSeeds:Seed[] = [];
  sub!: Subscription;
  errorMessage:string ='';
  difficultyEasyBool: boolean = false;
  difficultyMediumBool: boolean = false;
  difficultyHardBool: boolean = false;
  autumnBool: boolean = false;
  winterBool: boolean = false;
  summerBool: boolean = false;
  monsoonBool: boolean = false;
  autumnSeeds!: Seed[];
  winterSeeds!: Seed[];
  summerSeeds!: Seed[];
  monsoonSeeds!: Seed[];
  DifficultyEasySeeds!: Seed[];
  DifficultyMediumSeeds!: Seed[];
  DifficultyHardSeeds!: Seed[];
  searchedSeeds:Seed[]=[];
  public sortLowToHigh: boolean = false;
  public sortHighToLow: boolean = false;
  noSeed:boolean=false;

  get listFilter(): string {
    return this._listFilter;
  }

  set listFilter(value: string) {
    this._listFilter = value;
    console.log('In setter:', value);
    this.searchedSeeds = this.performFilter(value);
  }

  ngDoCheck(): void {
    let tempSeeds: (any | Seed)[] = [];
    let bloomSeeds:(any | Seed)[] = [];
    if (this.difficultyEasyBool) {
      tempSeeds = [...this.DifficultyEasySeeds]
    }
    if (this.difficultyMediumBool) {
      tempSeeds = [...tempSeeds, ...this.DifficultyMediumSeeds]
    }
    if (this.difficultyHardBool) {
      tempSeeds = [...tempSeeds, ...this.DifficultyHardSeeds]
    }
    if (this.autumnBool) {
      bloomSeeds = [...this.autumnSeeds]
    }
    if (this.winterBool) {
      bloomSeeds = [...bloomSeeds, ...this.winterSeeds]
    }
    if (this.summerBool) {
      bloomSeeds = [...bloomSeeds, ...this.summerSeeds]
    }
    if (this.monsoonBool) {
      bloomSeeds = [...bloomSeeds, ...this.monsoonSeeds]
    }
    if((this.difficultyEasyBool || this.difficultyMediumBool || this.difficultyHardBool) && (this.autumnBool || this.winterBool || this.summerBool || this.monsoonBool)){
      let result = tempSeeds.filter(o => bloomSeeds.some(({id,name}) => o.id === id && o.name === name));
      this.filteredSeeds=result;
    }
    else if(this.difficultyEasyBool || this.difficultyMediumBool || this.difficultyHardBool){
      this.filteredSeeds=tempSeeds;
    }
    else if(this.autumnBool || this.winterBool || this.summerBool || this.monsoonBool){
      this.filteredSeeds=bloomSeeds;
    }
    else{
      //this.filteredPlants=this.seeds;
      this.filteredSeeds=this.searchedSeeds;
    }
    if (this.sortLowToHigh) {
      this.filteredSeeds.sort((a, b) => (a.cost > b.cost) ? 1 : -1)
    }
    if (this.sortHighToLow) {
      this.filteredSeeds.sort((a, b) => (a.cost < b.cost) ? 1 : -1)
    }
    if(this.filteredSeeds.length==0){
      console.log(this.filteredSeeds.length)
      this.noSeed=true;
    }
    else this.noSeed=false;
    console.log()
    console.log("inside do check")
    //window.location.reload();
  }

  performFilter(filterBy: string): Seed[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.seeds.filter((seed: Seed) =>
      seed.commonName.toLocaleLowerCase().includes(filterBy));
  }

  constructor(private service:SeedService, private router:Router) { }
  
  ngOnInit(): void {
    this.sub = this.service.getAllSeeds().subscribe({
      next: seeds => {
        this.seeds = seeds;
        this.searchedSeeds = this.seeds;
      },
      error: err  => this.errorMessage = err
    });
  }

toggleDetails(){
  this.showDetails = ! this.showDetails
}

  onSortLowToHigh():void{
    this.sortLowToHigh = ! this.sortLowToHigh
    this.sortHighToLow = false;
    this.service.getAllSeedsLowToHigh().subscribe(
      (data) => this.seedsCostLowToHigh=data,
      (err) => this.error =err
    ) 
  }

  onSortHighToLow():void{
    this.sortHighToLow = false
    this.sortHighToLow = !this.sortHighToLow
    this.service.getAllSeedsHighToLow().subscribe(
      (data) => this.seedsCostHighToLow=data,
      (err) => this.error =err

    ) 
  }
  onEdit(seed: Seed) { this.router.navigate(['edit-seed', seed.id]) }

  onDelete(seed: Seed): void {
    this.service.deleteSeedById(seed.id)
      .subscribe(data => {
        console.log("seed deleted")
        this.seeds = this.seeds.filter(u => u !== seed);
      })
  };
  
  addSeed() {
    this.router.navigate(['add-seed'])
  }
  difficultyEasy() {
    this.difficultyEasyBool = !this.difficultyEasyBool;
    console.log(this.difficultyEasyBool);
    this.service.FilterByDifficulty("EASY").subscribe(
      (data) => this.DifficultyEasySeeds = data,
      (err) => this.error = err)
  }
  difficultyMedium() {
    this.difficultyMediumBool = !this.difficultyMediumBool;
    this.service.FilterByDifficulty("MEDIUM").subscribe(
      (data) => this.DifficultyMediumSeeds = data,
      (err) => this.error = err)
  }
  difficultyHard() {
    this.difficultyHardBool = !this.difficultyHardBool;
    this.service.FilterByDifficulty("HARD").subscribe(
      (data) => this.DifficultyHardSeeds = data,
      (err) => this.error = err)
  }
  autumn() {
    this.autumnBool = !this.autumnBool;
    this.service.FilterByBloomTime("AUTUMN").subscribe(
      (data) => this.autumnSeeds = data,
      (err) => this.error = err)
  }
  winter() {
    this.winterBool = !this.winterBool;
    this.service.FilterByBloomTime("WINTER").subscribe(
      (data) => this.winterSeeds = data,
      (err) => this.error = err)
  }
  summer() {
    this.summerBool = !this.summerBool;
    this.service.FilterByBloomTime("SUMMER").subscribe(
      (data) => this.summerSeeds = data,
      (err) => this.error = err)
  }
  monsoon() {
    this.monsoonBool = !this.monsoonBool;
    this.service.FilterByBloomTime("MONSOON").subscribe(
      (data) => this.monsoonSeeds = data,
      (err) => this.error = err)
  }

  ascendingSort() {
    this.sortLowToHigh = !this.sortLowToHigh;
    this.sortHighToLow = false;
  }

  descendingSort() {
    this.sortLowToHigh = false;
    this.sortHighToLow = !this.sortHighToLow;
  }
}
