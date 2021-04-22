import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlanterServiceService } from 'src/app/services/planter-service.service';
import { IPlanter } from './IPlanter';

@Component({
  selector: 'app-planter',
  templateUrl: './planter.component.html',
  styleUrls: ['./planter.component.css']
})
export class PlanterComponent implements OnInit {

  // private error! : string
  @Input() showDetails!: boolean;
  @Input() planters!: IPlanter[];
  @Input() private searchFilter!:number;
  public filteredSeeds:IPlanter[] = [];
  
  constructor(private service:PlanterServiceService,private router:Router) {  }

  ngOnInit(): void {    
    console.log(this.planters);

  }

  deletePlanter(planter: IPlanter): void{
    this.service.deletePlanter(planter).subscribe( data => {
      this.planters = this.planters.filter(p => p !== planter);
    })
  }

  // get listFilter(): number {
  //   return this.searchFilter;
  // }

  // set listFilter(value: number) {
  //   this.searchFilter = value;
  //   console.log('In setter:', value);
  //   this.filteredSeeds = this.performFilter(value);
  // }

  // performFilter(filterBy:number): IPlanter[] {
  //   return this.service.planters.filter((planter: IPlanter) =>
  //     (planter.id == filterBy))
  // }

}
