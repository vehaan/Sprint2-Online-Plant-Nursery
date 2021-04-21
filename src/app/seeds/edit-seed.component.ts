import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Seed } from "./Seed";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { first } from "rxjs/operators";
import { SeedService } from "./seed.service";
@Component({
  selector: 'app-edit-seed',
  templateUrl: './edit-seed.component.html',
  styleUrls: ['./edit-seed.component.css']
})
export class EditSeedComponent implements OnInit {
  seed!: Seed;
  editForm!: FormGroup;
  id: number = 0;
  constructor(private _ActivatedRoute: ActivatedRoute, private formBuilder: FormBuilder, private router: Router, private service: SeedService) { }
  ngOnInit() {
    this.id = Number(this._ActivatedRoute.snapshot.paramMap.get("id"));
    console.log(this.id + " " + this._ActivatedRoute)
    this.service.getSeedById(this.id).subscribe(
      (data) => {
        console.log(data);
          this.seed = data;
          this.editForm = this.formBuilder.group({
          id: this.seed.id,
          cost: this.seed.cost,
          stock: this.seed.stock,
          type: this.seed.type,
          watering: this.seed.watering,
          bloomTime: this.seed.bloomTime,
          difficultyLevel: this.seed.difficultyLevel,
          temperature: this.seed.temperature,
          typeOfSeed: this.seed.typeOfSeed,
          commonName: this.seed.commonName,
          description: this.seed.description,
          seedsPerPacket: this.seed.seedsPerPacket
        });
      },
      (err) => console.log(err)
    );
  }
  onSubmit() {
    console.log(this.editForm.value + "from onSubmit of edit plant component")
    this.service.updateSeed(this.editForm.value)
      .pipe(first())
      .subscribe(
        data => { this.seed = data; this.router.navigate(['seeds']) },
        (err) => { console.log(err) }
      )
  }
}