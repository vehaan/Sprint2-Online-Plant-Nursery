import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from 'src/app/services/customer.service';

import { Customer } from './customer';

@Component({
  selector: 'app-view-customer',
  templateUrl: './view-customer.component.html',
  styleUrls: ['./view-customer.component.css']
})
export class ViewCustomerComponent implements OnInit {
  pageTitle = 'Customer Detail';
  customer!:Customer;
  errorMessage = '';
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
}