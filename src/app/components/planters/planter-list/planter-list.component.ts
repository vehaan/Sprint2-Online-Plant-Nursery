import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-planter-list',
  templateUrl: './planter-list.component.html',
  styleUrls: ['./planter-list.component.css']
})
export class PlanterListComponent implements OnInit {

  details = true;


  constructor() { }

  ngOnInit(): void {

  }

  toggleDetails(): void {
    this.details = !this.details;
  }

}
