import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from '../customer/customer';
import { CustomerService } from '../customer/customerService';
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {
  id!:number;
  flag!:boolean;
  customer!:Customer;
  email!:any ;
 
  
 
  constructor(private route: ActivatedRoute,
    private router: Router,
    private service:CustomerService,
    private authService: AuthenticationService ) {
}

  ngOnInit(): void {
    
    this.email = sessionStorage.getItem('email');

      this.service.getCustomerByMail(this.email).subscribe(
            (data)=> {console.log(data);
                this.customer=data},
            (err)=>console.log(err))
    
        console.log(this.email)

        console.log(this.customer)

    }




    onEdit(){
      this.flag=true;
      this.router.navigate(['edit-customer/',this.customer.id])
    }

delete(){

  console.log("***************In side thetop of delete****************");
  this.service.deleteCustomerById(this.customer.id).subscribe(
    (data)=> {console.log(data);
     
      this.authService.logOut();
      console.log("*******************************");
      this.router.navigate(['welcome']); },
      (err)=>console.log(err)

  )
  

}



  }


