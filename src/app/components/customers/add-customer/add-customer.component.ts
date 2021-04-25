import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from 'src/app/services/customer.service';
import { Customer } from '../view-customer/customer';

 
@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent implements OnInit {
  customer!:Customer;
  addForm!:FormGroup;
  id:number=0;
  
  constructor(private formBuilder: FormBuilder,private router: Router, private service: CustomerService) { }
  
  ngOnInit() {
  
       this.addForm = this.formBuilder.group({
           
           email:['',Validators.required],
            password:['',Validators.required],
            name:['',Validators.required],
            phone:['',Validators.required],

            address:this.formBuilder.group({


              houseNo:['',Validators.required],
              colony:['',Validators.required],
              city:['',Validators.required],
              state:['',Validators.required],
              pincode:['',Validators.required]



            })
         

       })
        
      
           
        
      }


    onSubmit() {
      console.log(this.addForm.value +"from onSubmit of add customer component")
      
      this.service.addCustomer(this.addForm.value).subscribe(
        data=>{this.customer=data;console.log(this.customer);
          this.router.navigate(['login'])},
        err=>console.log(err)
      )
    }}