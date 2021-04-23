import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Customer } from '../customer/customer';
import { CustomerService } from '../customer/customerService';
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  
  customer!:Customer;
  id!: number;
  email!: any;

  constructor(public loginService:AuthenticationService,private service:CustomerService ){ }
  ngOnInit() {
       
   
    if(this.loginService.isUserLoggedIn()){
      this.email = sessionStorage.getItem('email');

      this.service.getCustomerByMail(this.email).subscribe(
            (data)=> {console.log(data);
                this.customer=data},
            (err)=>console.log(err))
    
        console.log(this.email)

        console.log(this.customer)


    
         
      
    }

  
  }



}
