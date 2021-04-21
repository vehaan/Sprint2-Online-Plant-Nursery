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

  private error! : string
  @Input() showDetails!: boolean;
  planters!: IPlanter[];
  
  constructor(private service:PlanterServiceService,private router:Router) {  }

  ngOnInit(): void {    this.service.getAllPlanters().subscribe(
    (data)=>this.planters = data,
    (err)=>this.error = err
  ) 
  }

  deletePlanter(planter: IPlanter): void{
    this.service.deletePlanter(planter).subscribe( data => {
      this.planters = this.planters.filter(p => p !== planter);
    })
  }

}
