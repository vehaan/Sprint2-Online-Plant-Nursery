import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/Auth/authentication.service';
import { OrderService } from 'src/app/services/order.service';
import { ProductService } from 'src/app/services/product.service';
import { IProduct } from '../../welcome/IProduct';
import { Order } from './order';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css'],
})
export class OrderListComponent implements OnInit {
  private error!: string;
  orders!: Order[];
  orderedProducts!: IProduct[];
  filterOrders!: Order[];

  pmCash!: Order[];
  pmCard!: Order[];
  pmUpi!: Order[];
  noOrder: boolean = false;

  sortLowToHigh: boolean = false;
  cash: boolean = false;
  card: boolean = false;
  upi: boolean = false;

  sortHighToLow: boolean = false;

  constructor(
    private orderService: OrderService,
    private productService: ProductService,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.orderService
      .getAllCustomerOrders(this.authenticationService.customer.id)
      .subscribe(
        (data) => {
          this.orders = data;
        },
        (err) => (this.error = err)
      );
  }

  ngOnChanges(): void {
    this.orderService.getAllCustomerOrders(this.authenticationService.customer.id).subscribe(
      (data) => {
        this.orders = data;
      },
      (err) => this.error = err
    );
  }

  ngDoCheck(): void {
    this.orderService
      .getAllCustomerOrders(this.authenticationService.customer.id)
      .subscribe(
        (data) => {
          this.orders = data;
        },
        (err) => (this.error = err)
      );

    //Filtering BY Payment
    let tempOrders: (any | Order)[] = [];
    if (this.cash) {
      tempOrders = [...this.pmCash];
      // console.log(tempOrders);
    }
    if (this.card) {
      tempOrders = [...tempOrders, ...this.pmCard];
    }
    if (this.upi) {
      tempOrders = [...tempOrders, ...this.pmUpi];
    }

    if (!this.cash && !this.card && !this.upi) {
      tempOrders = this.orders;
    }

    // Sorting

    this.filterOrders = tempOrders;
    if (this.sortLowToHigh) {
      this.filterOrders.sort((a, b) => (a.totalCost > b.totalCost ? 1 : -1));
    }
    if (this.sortHighToLow) {
      this.filterOrders.sort((a, b) => (a.totalCost < b.totalCost ? 1 : -1));
    }

    this.orders = this.filterOrders;

    if (this.orders.length == 0) {
      // console.log(this.orders.length)
      this.noOrder = true;
    } else this.noOrder = false;
  }

  ascendingSort() {
    this.sortLowToHigh = !this.sortLowToHigh;
    this.sortHighToLow = false;
  }

  descendingSort() {
    this.sortLowToHigh = false;
    this.sortHighToLow = !this.sortHighToLow;
  }

  paymentModeCash() {
    this.cash = !this.cash;
    // console.log(this.cash);
    this.orderService
      .filterByTransactionModeCustomer(
        'CASH',
        this.authenticationService.customer.id
      )
      .subscribe(
        (data) => (this.pmCash = data),
        (err) => (this.error = err)
      );
  }

  paymentModeCard() {
    this.card = !this.card;
    // console.log(this.card);
    this.orderService
      .filterByTransactionModeCustomer(
        'CARD',
        this.authenticationService.customer.id
      )
      .subscribe(
        (data) => (this.pmCard = data),
        (err) => (this.error = err)
      );
  }

  paymentModeUpi() {
    this.upi = !this.upi;
    // console.log(this.upi);
    this.orderService
      .filterByTransactionModeCustomer(
        'UPI',
        this.authenticationService.customer.id
      )
      .subscribe(
        (data) => (this.pmUpi = data),
        (err) => (this.error = err)
      );
  }
}
