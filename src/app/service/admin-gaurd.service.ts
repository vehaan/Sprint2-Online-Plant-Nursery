import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Customer } from '../customer/customer';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGaurd implements CanActivate {
customer!:Customer;
  constructor(private router: Router,private authService:AuthenticationService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    this.customer=this.authService.customer;
    console.log(this.customer);

    if(this.customer.role!='ADMIN'){
        alert('You dont have access to this page');
        this.router.navigate(['welcome']);
        return false;
    }
    return true;
}

}