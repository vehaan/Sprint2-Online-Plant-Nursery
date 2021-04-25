import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {first} from "rxjs/operators";
import { Customer } from '../view-customer/customer';
import { CustomerService } from 'src/app/services/customer.service';


 
@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css']
})
export class EditCustomerComponent implements OnInit {
customer!:Customer;
editForm!:FormGroup;
id!:number;
 
constructor(private _ActivatedRoute:ActivatedRoute,private formBuilder: FormBuilder,private router: Router, private service: CustomerService) { }
 
ngOnInit() {
 
  this.id = Number(this._ActivatedRoute.snapshot.paramMap.get("id"));
    console.log(this.id+" " +this._ActivatedRoute)
    this.service.getCustomerById(this.id).subscribe(
      (data)=>{console.log(data);


            this.customer=data;
        this.editForm = this.formBuilder.group({
          id: this.customer.id,
          email: this.customer.email,
          password: this.customer.password,
          name:this.customer.name,
          phone:this.customer.phone,
          address:this.formBuilder.group({
            houseNo:this.customer.address.houseNo,
            colony:this.customer.address.colony,
            city:this.customer.address.city,
            state:this.customer.address.state,
            pincode:this.customer.address.pincode,

          })
         
          
        });},
      (err)=>console.log(err)
    );
    
         
      
    }
  onSubmit() {
    console.log(this.editForm.value +"from onSubmit of edit customer component")
    this.service.updateCustomer(this.editForm.value.id,this.editForm.value)
      .pipe(first())
      .subscribe(
        data => {this.customer =data;
               this.router.navigate(['account'])},
        (err)=>{console.log(err)}
         
      )}}