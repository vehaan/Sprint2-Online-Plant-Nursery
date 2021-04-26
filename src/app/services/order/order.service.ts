import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from 'src/app/models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  public baseUrl: string = 'http://localhost:9191/onlineplantnursery';
  
  constructor(private http: HttpClient) { }

  getAllOrders(): Observable<Order[]> { //admin
    return <Observable<Order[]>>this.http.get(this.baseUrl + "/admin/orders");
  }

  getOrderById(id: number): Observable<Order> { //admin
    return <Observable<Order>>this.http.get(this.baseUrl + "/admin/order/id/" + id); //Can use backticks also 
  }

  getAllCustomerOrders(id: number): Observable<Order[]> {  //customer
    return <Observable<Order[]>>this.http.get(this.baseUrl + "/customer/orders/" + id);
  }

  getCustomerOrderById(custId: number, orderId:number): Observable<Order> { //customer
    return <Observable<Order>>this.http.get(this.baseUrl + "/customer/order/id/" + custId + "/" + orderId);
  }

  deleteOrder(id: number): Observable<string> {
    console.log("From service, order is deleted");
    return <Observable<string>>this.http.delete(this.baseUrl + "/admin/order/id/" + id);
  }

  // updateOrder(order: Order): Observable<Order> {
  //   console.log("From service, order is updated");
  //   return <Observable<Order>>this.http.put(this.baseUrl + "/admin/order", order);
  // }

  addOrder(order: Order): Observable<Order> {
    console.log("From service, order is added");
    return <Observable<Order>>this.http.post(this.baseUrl + "/admin/order", order);
  }

  filterByTransactionMode(str: string): Observable<Order[]> {
    return <Observable<Order[]>>this.http.get(this.baseUrl + "/admin/orders/filterByTransactionMode/" + str);
  }
}
