import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-planter',
  templateUrl: './planter.component.html',
  styleUrls: ['./planter.component.css']
})
export class PlanterComponent implements OnInit {

  @Input() showDetails!: boolean;
  constructor() {  }

  ngOnInit(): void {
  }

 

}
