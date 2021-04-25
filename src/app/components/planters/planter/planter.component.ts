import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlanterServiceService } from 'src/app/services/planter-service.service';
import { IPlanter } from './IPlanter';

@Component({
  selector: 'app-planter',
  templateUrl: './planter.component.html',
  styleUrls: ['./planter.component.css']
})
export class PlanterComponent implements OnInit {
  id: number = 0
  sub!: any;
  planter!: IPlanter;
  constructor(private service:PlanterServiceService,private router:Router, private ActivatedRoute: ActivatedRoute) {  }

  ngOnInit(): void {    
    this.id = Number(this.ActivatedRoute.snapshot.paramMap.get("id"));
    console.log(this.id + " " + this.ActivatedRoute)
    this.service.getPlanterById(this.id).subscribe(
      (data) => { console.log(data); this.planter = data },
      (err) => console.log(err)
    );

  }

  onBack(): void {
    this.router.navigate(['/planters'])
  }

}
