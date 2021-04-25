import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from '../customer';
import { CustomerService } from '../customerService';

@Component({
  selector: 'app-view-customer',
  templateUrl: './view-customer.component.html',
  styleUrls: ['./view-customer.component.css']
})
export class ViewCustomerComponent implements OnInit {
  pageTitle = 'Customer Detail';
  customer!:Customer;
  errorMessage = '';
  show:boolean=true;
updatedName!:string;
  constructor(private route: ActivatedRoute,
    private router: Router,
    private service: CustomerService){ }

  ngOnInit(): void {
    const param = this.route.snapshot.paramMap.get('id');
    if (param) {
      const id = +param;
      this.getCustomer(id);
    }
  }


  getCustomer(id: number): void {
    this.service.getCustomerById(id).subscribe({
      next: customer => this.customer = customer,
      error: err => this.errorMessage = err
    });
  }

  onBack(): void {
    this.router.navigate(['/customer-list']);
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
