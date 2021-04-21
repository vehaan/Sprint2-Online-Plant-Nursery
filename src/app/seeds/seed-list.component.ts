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
  
  public sort:boolean = false;
  public sortHighToLow:boolean = false;
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

  get listFilter(): string {
    return this._listFilter;
  }

  set listFilter(value: string) {
    this._listFilter = value;
    console.log('In setter:', value);
    this.filteredSeeds = this.performFilter(value);
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
        this.filteredSeeds = this.seeds;
      },
      error: err  => this.errorMessage = err
    });
  }

toggleDetails(){
  this.showDetails = ! this.showDetails
}

  onSortLowToHigh():void{
    this.sort = ! this.sort
    this.sortHighToLow = false;
    this.service.getAllSeedsLowToHigh().subscribe(
      (data) => this.seedsCostLowToHigh=data,
      (err) => this.error =err
    ) 
  }

  onSortHighToLow():void{
    this.sort = false
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

}
