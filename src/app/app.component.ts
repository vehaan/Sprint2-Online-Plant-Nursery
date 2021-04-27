import { Component } from '@angular/core';
import { Customer } from './components/customers/view-customer/customer';
import { AuthenticationService } from './services/Auth/authentication.service';
import { CustomerService } from './services/customer.service';
import { ProductService } from './services/product.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Sprint2-OnlinePlantNursery';
  
  customer!:Customer;
  onlyToAdmin!:boolean;
  email!: any;
  temp !: number;

  constructor(public loginService:AuthenticationService,private service:CustomerService,private authService:AuthenticationService ){ }
  ngOnInit() {

    this.temp = ProductService.badgeNumber;
    this.email= sessionStorage.getItem('email')
    this.service.getCustomerByMail(this.email).subscribe(
      (data)=> {console.log(data);
          
          this.customer=data
        this.authService.checkRole(this.customer.role)
        },
      (err)=>console.log(err))
   
  }

  ngAfterViewChecked(): void {

    this.customer=this.authService.customer;
    this.onlyToAdmin = this.authService.checkRole(this.customer.role);

  }

  ngDoCheck(){
    this.temp = ProductService.badgeNumber;
  }
  

}