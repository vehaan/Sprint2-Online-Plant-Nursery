import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PlantService } from 'src/app/services/plant.service';
import { Plant } from '../plant/Plant';

@Component({
  selector: 'app-add-plant',
  templateUrl: './add-plant.component.html',
  styleUrls: ['./add-plant.component.css']
})
export class AddPlantComponent implements OnInit {
  plant!: Plant;
  addForm!: FormGroup;
  id: number = 0;



  constructor(private formBuilder: FormBuilder, private router: Router, private service: PlantService) {}
  ngOnInit() {
    this.addForm = this.formBuilder.group({
      cost: ['', [ Validators.min(1), Validators.required ]],
      stock: ['', [ Validators.min(1), Validators.required]],
      type: ['PLANT', Validators.required],
      height:[''],
      spread:[''],
      bloomTime:[''],
      medicinalOrCulinaryUse:[''],
      difficultyLevel:[''],
      temparature:[''],
      typeOfPlant:[''],
      name:['', Validators.required],
      description:['']
    })
  }
  onSubmit() {
    console.log("added following plant\n"+JSON.stringify(this.addForm.value))
    this.service.addPlant(this.addForm.value).subscribe(
      data => {this.plant = data; this.router.navigate(['plants'])},
      err => console.log(err)
    )
  }
}