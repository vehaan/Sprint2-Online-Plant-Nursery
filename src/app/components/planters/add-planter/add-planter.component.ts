import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlanterServiceService } from 'src/app/services/planter-service.service';
import { IPlanter } from '../planter/IPlanter';

@Component({
  selector: 'app-add-planter',
  templateUrl: './add-planter.component.html',
  styleUrls: ['./add-planter.component.css'],
})
export class AddPlanterComponent implements OnInit {
  planter: IPlanter = {
    id: 0,
    name: '',
    cost: 0,
    stock: 0,
    type: 'PLANTER',
    height: 0,
    shape: '',
    capacity: 0,
    drainageHoles: 0,
    color: '',
  };

  constructor(private service: PlanterServiceService, private router: Router) {}

  ngOnInit(): void {}

  createPlanter(form1: any): void {
    alert('Planter added successfully!');
    this.service.createPlanter(this.planter).subscribe((data) => {
      console.log(data);
      this.router.navigate(['/planters']);
    });
  }
}
