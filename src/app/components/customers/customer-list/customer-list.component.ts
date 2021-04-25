import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { CustomerService } from 'src/app/services/customer.service';
import { Customer } from '../view-customer/customer';

 
@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {
public customers!:Customer[] 
 
private error! : string
private id:number=0;
show:boolean=true;
updatedName!:string;
constructor(private service:CustomerService,private router:Router) { }
 
  ngOnInit(): void {

     this.service.getAllCustomers().subscribe(
      
      (data)=>this.customers = data,
      (err)=>this.error = err
      
    )  
    
  }
  onEdit(customer:Customer){
    this.router.navigate(['edit-customer/',customer.id])
  }



          onToggle(customer:Customer):void{

            this.service.setStatus(customer.id).subscribe(
              data=>{
                console.log(data);    
                this.show=false;
                if(data.status.valueOf()=='BLOCK') 
                   this.updatedName='UNBLOCK';
                else
                   this.updatedName="BlOCK";  
              
              }
            )

          }

          buttonName(name:string):string{

              if(name.valueOf()=='BLOCK')
                 name='UNBLOCK';
              else
                 name='BlOCK';

           return this.show ? name : this.updatedName;
          }



}