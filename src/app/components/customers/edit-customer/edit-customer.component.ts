import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {first} from "rxjs/operators";
import { HttpErrorResponse } from '@angular/common/http';
import { AuthenticationService } from 'src/app/services/Auth/authentication.service';
import { CustomerService } from 'src/app/services/customer.service';
import { Customer } from '../view-customer/customer';


 
@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css']
})
export class EditCustomerComponent implements OnInit{
customer!:Customer;
editForm!:FormGroup;
id!:number;
submitted = false;
 
constructor(private _ActivatedRoute:ActivatedRoute,private formBuilder: FormBuilder,private router: Router, private service: CustomerService,
  private authService:AuthenticationService) { }
  
 
ngOnInit() {

       this.customer=this.authService.customer;
       console.log(this.customer);
       
       this.editForm = this.formBuilder.group({
        id: this.customer.id,
        email: [this.customer.email,[Validators.required, Validators.email]],
        password: [this.customer.password,[Validators.required, Validators.minLength(6)]],
        name:[this.customer.name,[Validators.required, Validators.minLength(3)]],
        phone:[this.customer.phone,[Validators.required, Validators.pattern('[6-9]\\d{9}')]],
        address:this.formBuilder.group({
          houseNo:[this.customer.address.houseNo,Validators.required],
          colony:[this.customer.address.colony,Validators.required],
          city:[this.customer.address.city,Validators.required],
          state:[this.customer.address.state,Validators.required],
          pincode:[this.customer.address.pincode,[Validators.required, Validators.pattern('[1-9][0-9]{5}')]]

        })
      
       
      });

    }




    get f() { return this.editForm.controls }
    get g() { return (this.editForm.controls.address as FormGroup).controls; }


back(){
  this.router.navigate(['account']);
}

  onSubmit() {

    this.submitted = true;

    // stop here if form is invalid
    if (this.editForm.invalid) {
        return;
    }
    this.service.updateCustomer(this.editForm.value.id,this.editForm.value)
      .pipe(first())
      .subscribe(
        data => {
          sessionStorage.setItem('email',this.customer.email);
          this.customer =data;
               this.router.navigate(['account'])},
        (err)=>{
          console.log(err);

           const validationErrors:string = err.error;
      
           if (err instanceof HttpErrorResponse) {
          
              if (err.status === 400) {
            
               // TODO: extract errors here and match onto the form
               Object.keys(validationErrors).forEach(prop => {
                
                 const formControl = this.editForm.get('email');
                 if (formControl) {
                   // activate the error message
                  formControl.setErrors({
                    serverError: err.error.message
                   });
                 }
               });
             }
           }
        
        
        
        }
         
      )
      
    
    }
    
    
    
    }