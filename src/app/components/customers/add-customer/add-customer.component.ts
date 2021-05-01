import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from 'src/app/services/customer.service';
import { Customer } from '../view-customer/customer';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css'],
})
export class AddCustomerComponent implements OnInit {
  customer!: Customer;
  addForm!: FormGroup;
  id: number = 0;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private service: CustomerService
  ) {}

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      name: ['', [Validators.required, Validators.minLength(3)]],
      phone: ['', [Validators.required, Validators.pattern('[6-9]\\d{9}')]],

      address: this.formBuilder.group({
        houseNo: ['', Validators.required],
        colony: ['', Validators.required],
        city: ['', Validators.required],
        state: ['', Validators.required],
        pincode: [
          '',
          [Validators.required, Validators.pattern('[1-9][0-9]{5}')],
        ],
      }),
    });
  }

  get f() {
    return this.addForm.controls;
  }
  get g() {
    return (this.addForm.controls.address as FormGroup).controls;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.addForm.invalid) {
      return;
    }
    console.log(this.addForm.value + 'from onSubmit of add customer component');

    this.service.addCustomer(this.addForm.value).subscribe(
      (data) => {
        this.customer = data;
        this.router.navigate(['login']);
      },
      (err) => {
        console.log(err);

        const validationErrors: string = err.error;

        if (err instanceof HttpErrorResponse) {
          if (err.status === 400) {
            // TODO: extract errors here and match onto the form
            Object.keys(validationErrors).forEach((prop) => {
              const formControl = this.addForm.get('email');
              if (formControl) {
                // activate the error message
                formControl.setErrors({
                  serverError: err.error.message,
                });
              }
            });
          }
        }
      }
    );
  }
}
