import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { AddCustomerComponent } from './customer/add-customer.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditCustomerComponent } from './customer/edit-customer/edit-customer.component';
import { MyAccountComponent } from './my-account/my-account.component';
import { AuthInterceptor } from './service/AuthInterceptor';
import { CustomerService } from './customer/customerService';
import { CustomerListComponent } from './customer/customer-list/customer-list.component';
import { AdminComponent } from './admin/admin.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ViewCustomerComponent } from './customer/view-customer/view-customer.component';



@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    LoginComponent,
    LogoutComponent,
    AddCustomerComponent,
    EditCustomerComponent,
    MyAccountComponent,
    CustomerListComponent,
    AdminComponent,
    ForgotPasswordComponent,
    ViewCustomerComponent
   
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
   
  ],
  providers: [CustomerService,
    { provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
