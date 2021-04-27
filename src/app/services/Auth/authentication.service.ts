import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Customer } from 'src/app/components/customers/view-customer/customer';
import { CustomerService } from '../customer.service';


export class User{

  email!: string;
  password!: string;
  constructor(
    public status:string,
     ) {}
  
}


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
user!:User;
customer!:Customer;
email!:any;

private baseUrl='http://localhost:9191/onlineplantnursery'

  constructor(
    private httpClient:HttpClient,
    private service:CustomerService
  ) { 
    this.getCustomer();
     }

     authenticate(email: string, password: any):Observable<any>{
      return this.httpClient.post<any>(`${this.baseUrl}/authenticate`,{email,password} )
      .pipe(map(
        userData => {
         sessionStorage.setItem('email',email);
         let tokenStr= 'Bearer '+ userData.token;
         sessionStorage.setItem('token', tokenStr);
        this.getCustomer();
         return userData;
        }
    ) 
    
    
    
    );}
  

  isUserLoggedIn() {
    let user = sessionStorage.getItem('email')
    return !(user === null)
  }

  logOut() {
    sessionStorage.removeItem('email')
    sessionStorage.removeItem('token')
  }




  getCustomer(){  
   this.email= sessionStorage.getItem('email')
    this.service.getCustomerByMail(this.email).subscribe(
      (data)=> {
          this.customer=data},
      (err)=>console.log(err))

      return this.customer;
  }

  checkRole(status:string){
    if(status=='ADMIN'){
      return true;
    }
    return false;
  }



}