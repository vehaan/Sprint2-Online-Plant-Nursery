import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Plant } from './Plant';
import { PlantService } from './plant.service';
@Component({
  selector: 'app-add-plant',
  templateUrl: './add-plant.component.html',
  styleUrls: ['./add-plant.component.css']
})
export class AddPlantComponent implements OnInit {
  plant!: Plant;
  addForm!: FormGroup;
  id: number = 0;
  constructor(private formBuilder: FormBuilder, private router: Router, private service: PlantService) { }
  ngOnInit() {
    this.addForm = this.formBuilder.group({
      cost: ['', Validators.required],
      stock: ['', Validators.required],
      type: ['', Validators.required],
      height:['',Validators.required],
      spread:['',Validators.required],
      bloomTime:['',Validators.required],
      medicinalOrCulinaryUse:['',Validators.required],
      difficultyLevel:['',Validators.required],
      temperature:['',Validators.required],
      typeOfPlant:['',Validators.required],
      commonName:['',Validators.required],
      description:['',Validators.required]
    })
  }
  onSubmit() {
    console.log(this.addForm.value + "from onSubmit of add plant component")
    this.service.addPlant(this.addForm.value).subscribe(
      data => this.plant = data,
      err => console.log(err)
    )
  }
}
