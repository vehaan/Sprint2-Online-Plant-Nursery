import { Component } from '@angular/core';
import { Customer } from './components/customers/view-customer/customer';
import { AuthenticationService } from './services/Auth/authentication.service';
import { CustomerService } from './services/customer.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Sprint2-OnlinePlantNursery';
  
  customer!:Customer;
  role!:string;
  id!: number;
  email!: any;

  constructor(public loginService:AuthenticationService,private service:CustomerService ){ }
  ngOnInit() {
       
   

      this.email = sessionStorage.getItem('email');

      this.service.getCustomerByMail(this.email).subscribe(
            (data)=> {console.log(data);
                this.customer=data
                console.log(this.customer.role);
             this.role =this.customer.role},
            (err)=>console.log(err))
    
        console.log(this.email,'I am in app comonent ts')

        console.log(this.customer)

    
  }







}