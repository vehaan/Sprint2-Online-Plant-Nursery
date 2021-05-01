import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { CustomerService } from 'src/app/services/customer.service';
import { Customer } from '../view-customer/customer';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css'],
})
export class CustomerListComponent implements OnInit {
  public customers!: Customer[];

  private error!: string;
  private id: number = 0;

  constructor(private service: CustomerService, private router: Router) {}

  ngOnInit(): void {
    this.service.getAllCustomers().subscribe(
      (data) => (this.customers = data),
      (err) => (this.error = err)
    );
  }
}
