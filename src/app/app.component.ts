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
  onlyToCustomer!:boolean;
  onlyToAdmin!:boolean;
  email!: any;

  constructor(public loginService:AuthenticationService,private service:CustomerService,private authService:AuthenticationService ){ }
  ngOnInit() {

       
    this.email= sessionStorage.getItem('email')
    this.service.getCustomerByMail(this.email).subscribe(
      (data)=> {console.log(data);
          
          this.customer=data
        this.checkRole(this.customer.role)
        },
      (err)=>console.log(err))
   
  }

  // ngAfterViewChecked(): void {

  //   this.customer=this.authService.customer;
  //   this.checkRole(this.customer.role);

  // }
  

  checkRole(status:string){
    if(status=='ADMIN'){
      this.onlyToCustomer=false;
      this.onlyToAdmin=true;
    }
      
    else{
      this.onlyToCustomer=true;
      this.onlyToAdmin=false;
    }
   

  }

}