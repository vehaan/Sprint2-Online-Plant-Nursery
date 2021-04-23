import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

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
private baseUrl='http://localhost:9999/OnlinePlantNursery'

  constructor(
    private httpClient:HttpClient
  ) { 
     }

     authenticate(email: string, password: any):Observable<any>{
       
       
     // const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(email + ':' + password) });
      return this.httpClient.post<any>(`${this.baseUrl}/authenticate`,{email,password} )
      .pipe(map(
        userData => {
         sessionStorage.setItem('email',email);
         let tokenStr= 'Bearer '+ userData.token;
         sessionStorage.setItem('token', tokenStr);
         return userData;
        }
      ));}
  

  isUserLoggedIn() {
    let user = sessionStorage.getItem('email')
    return !(user === null)
  }

  logOut() {
    sessionStorage.removeItem('email')
    sessionStorage.removeItem('token')
  }
}