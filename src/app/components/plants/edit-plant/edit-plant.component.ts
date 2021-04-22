import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Plant } from "../plant/Plant";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { first } from "rxjs/operators";
import { PlantService } from "../../../services/plant.service";
@Component({
  selector: 'app-edit-plant',
  templateUrl: './edit-plant.component.html',
  styleUrls: ['./edit-plant.component.css']
})
export class EditPlantComponent implements OnInit {
  plant!: Plant;
  editForm!: FormGroup;
  id: number = 0;
  constructor(private _ActivatedRoute: ActivatedRoute, private formBuilder: FormBuilder, private router: Router, private service: PlantService) { }
  ngOnInit() {
    this.id = Number(this._ActivatedRoute.snapshot.paramMap.get("id"));
    console.log(this.id + " " + this._ActivatedRoute)
    this.service.getPlantById(this.id).subscribe(
      (data) => {
        console.log(data); this.plant = data;
        this.editForm = this.formBuilder.group({
          id: this.plant.id,
          cost: [this.plant.cost, Validators.required],
          stock: [this.plant.stock, Validators.required],
          type: this.plant.type,
          height: this.plant.height,
          spread: this.plant.spread,
          bloomTime: this.plant.bloomTime,
          medicinalOrCulinaryUse: this.plant.medicinalOrCulinaryUse,
          difficultyLevel: this.plant.difficultyLevel,
          temparature: this.plant.temparature,
          typeOfPlant: this.plant.typeOfPlant,
          commonName: [this.plant.commonName,Validators.required],
          description: this.plant.description

        });
      },
      (err) => console.log(err)
    );
  }
  onSubmit() {
    console.log("Updated values are:\n"+JSON.stringify(this.editForm.value))
    this.service.updatePlant(this.editForm.value)
      .pipe(first())
      .subscribe(
        data => { this.plant = data; this.router.navigate(['plants']) },
        (err) => { console.log(err) }
      )
  }
}