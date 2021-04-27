import { HttpClient } from '@angular/common/http';
import { ApplicationRef, Injectable } from '@angular/core';
 
import { Observable } from 'rxjs';
import { IProduct } from '../components/welcome/IProduct';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  public static badgeNumber = 0;
public baseUrl:string = "http://localhost:9191/onlineplantnursery/products/admin"

  constructor(private http:HttpClient) { } 
  getProductById(id:number):Observable<IProduct>{
    return <Observable<IProduct>>this.http.get(this.baseUrl+"/product/id/"+id);
 
  }
}