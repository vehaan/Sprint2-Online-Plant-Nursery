import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PlanterServiceService } from 'src/app/services/planter-service.service';
import { IPlanter } from '../planter/IPlanter';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-edit-planter',
  templateUrl: './edit-planter.component.html',
  styleUrls: ['./edit-planter.component.css'],
})
export class EditPlanterComponent implements OnInit {
  planter!: IPlanter;
  editForm!: FormGroup;
  id: number = 0;

  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private service: PlanterServiceService
  ) {}

  ngOnInit(): void {
    this.id = Number(this._ActivatedRoute.snapshot.paramMap.get('id'));
    console.log(this.id + ' ' + this._ActivatedRoute);
    this.service.getPlanterById(this.id).subscribe(
      (data) => {
        console.log(data);
        this.planter = data;
        this.editForm = this.formBuilder.group({
          id: this.planter.id,
          name: [this.planter.name, Validators.required],
          cost: [this.planter.cost, [Validators.min(1), Validators.required]],
          stock: [this.planter.stock, [Validators.min(1), Validators.required]],
          type: this.planter.type,
          height: [
            this.planter.height,
            [Validators.min(1), Validators.required],
          ],
          shape: [this.planter.shape, Validators.required],
          capacity: this.planter.capacity,
          drainageHoles: this.planter.drainageHoles,
          color: this.planter.color,
        });
      },
      (err) => console.log(err)
    );
  }

  onSubmit() {
    console.log(
      this.editForm.value + 'from onSubmit of edit Planter component'
    );
    this.service
      .updatePlanter(this.editForm.value)
      .pipe(first())
      .subscribe(
        (data) => {
          this.planter = data;
          this.router.navigate(['/planters']);
        },
        (err) => {
          console.log(err);
        }
      );
  }
}
