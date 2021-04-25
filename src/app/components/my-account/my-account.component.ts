import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/Auth/authentication.service';
import { CustomerService } from 'src/app/services/customer.service';
import { Customer } from '../customers/view-customer/customer';


@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {
  
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

    }

    // ngAfterViewChecked(): void {

    //   this.customer=this.authService.customer;
     
  
    // }
    


    onEdit(){
      this.router.navigate(['edit-customer'])
    }

  delete(){

  
     this.service.deleteCustomerById(this.customer.id).subscribe(
    (data)=> {console.log(data);
     
      },
      (err)=>console.log(err)

  )
  this.authService.logOut();
 

}



  }