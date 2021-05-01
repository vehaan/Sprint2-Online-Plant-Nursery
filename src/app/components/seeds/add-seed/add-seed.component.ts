import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SeedService } from 'src/app/services/seed.service';
import { Seed } from '../seed/Seed';

@Component({
  selector: 'app-add-seed',
  templateUrl: './add-seed.component.html',
  styleUrls: ['./add-seed.component.css'],
})
export class AddSeedComponent implements OnInit {
  seed!: Seed;
  addForm!: FormGroup;
  id: number = 0;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private service: SeedService
  ) {}
  ngOnInit() {
    this.addForm = this.formBuilder.group({
      cost: ['', [Validators.required, Validators.min(1)]],
      stock: ['', Validators.required],
      type: ['SEED', Validators.required],
      watering: ['', Validators.required],
      bloomTime: ['', Validators.required],
      difficultyLevel: ['', Validators.required],
      temperature: ['', Validators.required],
      typeOfSeed: ['', Validators.required],
      commonName: ['', Validators.required],
      description: ['', Validators.required],
      seedsPerPacket: ['', Validators.required],
    });
  }
  onSubmit() {
    console.log(this.addForm.value + 'from onSubmit of add seed component');
    this.service.addSeed(this.addForm.value).subscribe(
      (data) => (this.seed = data),
      (err) => console.log(err)
    );
  }
}
