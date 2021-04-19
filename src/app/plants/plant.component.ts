import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Plant } from './Plant';
import { PlantService } from './plant.service';
@Component({
  selector: 'app-plant',
  templateUrl: './plant.component.html',
  styleUrls: ['./plant.component.css']
})
export class PlantComponent implements OnInit {
  plant!: Plant;
  sub!: any;
  id: number = 0
  constructor(private _ActivatedRoute: ActivatedRoute, private _router: Router, private _service: PlantService) { }
  ngOnInit(): void {
    this.id = Number(this._ActivatedRoute.snapshot.paramMap.get("id"));
    console.log(this.id + " " + this._ActivatedRoute)
    this._service.getPlantById(this.id).subscribe(
      (data) => { console.log(data); this.plant = data },
      (err) => console.log(err)
    );
  }
  onBack(): void {
    this._router.navigate(['plants'])
  }
}
