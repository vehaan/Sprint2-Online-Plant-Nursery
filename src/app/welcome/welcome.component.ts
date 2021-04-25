import { AfterViewChecked, AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from '../customer/customer';
import { CustomerService } from '../customer/customerService';
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit ,AfterViewChecked{

  
  customer!:Customer;
  id!: number;
  email!: any;

  constructor(public loginService:AuthenticationService,private service:CustomerService,private router:Router ){

    
   }
 
  ngOnInit() {

        
   this.email= sessionStorage.getItem('email')
   this.service.getCustomerByMail(this.email).subscribe(
     (data)=> {console.log(data);
         this.customer=data},
     (err)=>console.log(err))

    this.checkStatus(this.customer.status);



    }
   
    ngAfterViewChecked(): void {
      this.customer=this.loginService.customer;
      this.checkStatus(this.customer.status);
      console.log(this.customer)
    }
    



    checkStatus(status:string){

      if(status == 'BLOCK'){
        alert("Your account is blocked for 10 days");
        this.router.navigate(['/logout']);
      }

    }
  
  }





