import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AddCustomerComponent } from './customer/add-customer.component';
import { CustomerListComponent } from './customer/customer-list/customer-list.component';
import { EditCustomerComponent } from './customer/edit-customer/edit-customer.component';
import { ViewCustomerComponent } from './customer/view-customer/view-customer.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { MyAccountComponent } from './my-account/my-account.component';
import { AuthGaurdService } from './service/auth-gaurd.service';
import { CustomerDetailGuard } from './service/customer-details.gaurd';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
  {path:"app-com",component:AppComponent},
  { path: 'welcome', component: WelcomeComponent},
  {path:'account',component:MyAccountComponent,
  canActivate:[AuthGaurdService]},
  {path:'add-customer',component:AddCustomerComponent },
  {path:'edit-customer/:id',component:EditCustomerComponent,
  canActivate:[AuthGaurdService]},
  {path:'view-customer/:id',component:ViewCustomerComponent,
  canActivate: [CustomerDetailGuard]},
  { path: 'login', component: LoginComponent },
  { path: 'change-password', component: ForgotPasswordComponent },
  { path: 'logout', component: LogoutComponent},
{path:"customer-list",component:CustomerListComponent,
canActivate:[AuthGaurdService]}
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
