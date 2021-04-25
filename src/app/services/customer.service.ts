import { HttpClient } from '@angular/common/http';
import { ApplicationRef, Injectable } from '@angular/core';
 
import { Observable } from 'rxjs';
import { Customer } from '../components/customers/view-customer/customer';
@Injectable({
  providedIn: 'root'
})
export class CustomerService {
public baseUrl:string = "http://localhost:9191/onlineplantnursery"
  constructor(private http:HttpClient) { }
 
  getAllCustomers():Observable<Customer[]>{
    
     return  <Observable<Customer[]>>this.http.get(this.baseUrl + "/admin/customers")
    
  }
 
  getCustomerById(id:number):Observable<Customer>{
    return <Observable<Customer>>this.http.get(this.baseUrl+"/customers/id/"+id);
 
  }
 
  deleteCustomerById(id:number):Observable<Customer>{
    return <Observable<Customer>>this.http.delete(this.baseUrl+"/customers/id/"+id);
 
  }
  updateCustomer(id:number,customer:Customer):Observable<Customer>{
    return <Observable<Customer>>this.http.put(this.baseUrl+"/customers/id/"+id,customer);
  }
 
  addCustomer(customer:Customer):Observable<Customer>{
    return <Observable<Customer>>this.http.post(this.baseUrl+"/register",customer);
  }

  getCustomerByMail(email:string):Observable<Customer>{
    return this.http.get<Customer>(this.baseUrl+'/customers/'+email);

  }

  setStatus(id:number):Observable<Customer>{
    return <Observable<Customer>>this.http.get(this.baseUrl+"/customers/toggleStatus/"+id);
  }


  changePassword(customer:Customer):Observable<Customer>{
    console.log("I am in customer service");
    return <Observable<Customer>>this.http.post(this.baseUrl+"/customers/resetPassword",customer);
  }

}