import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlanterServiceService } from 'src/app/services/planter-service.service';
import { IPlanter } from '../planter/IPlanter';

@Component({
  selector: 'app-planter-list',
  templateUrl: './planter-list.component.html',
  styleUrls: ['./planter-list.component.css']
})
export class PlanterListComponent implements OnInit {

  private error! : string
  details = true;
  private _listFilter!:string;
  tempPlanters!: IPlanter[];
  public filteredPlanters:IPlanter[] = [];
    
  sortOptions = [
    "Relevance","Price--Low To High","Price--High To Low"
  ]

  sortBy = this.sortOptions[0];

  constructor(private service:PlanterServiceService, private router:Router) { }

  ngOnInit(): void {
    this.service.getAllPlanters().subscribe(
      (data)=>this.tempPlanters = data,
      (err)=>this.error = err
    ) 
  }

  toggleDetails(): void {
    this.details = !this.details;
  }

  updateSortBy(){
    console.log(document.getElementById("price")?.nodeValue);
  }

  get listFilter(): string {
    return this._listFilter;
  }

  set listFilter(value: string) {
    this._listFilter = value;
    console.log('In setter:', value);
    this.tempPlanters = this.performFilter(value);
  }

  performFilter(filterBy: string): IPlanter[] {
  
    filterBy = filterBy.toLocaleLowerCase();
    return this.tempPlanters.filter((planter: IPlanter) =>
      planter.color.toLocaleLowerCase().includes(filterBy));
  }

  // selected(){
  //   if (this.sortBy === this.sortOptions[1]){
  //     this.service.getAllPlanters().subscribe(
  //       (data)=>this.planters = data,
  //       (err)=>this.error = err
  //     ) 
  //   }
  // }


}
