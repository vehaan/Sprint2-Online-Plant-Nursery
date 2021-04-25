import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlanterComponent } from './components/planters/planter/planter.component';
import { PlanterListComponent } from './components/planters/planter-list/planter-list.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AddPlanterComponent } from './components/planters/add-planter/add-planter.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditPlanterComponent } from './components/planters/edit-planter/edit-planter.component';
import { AddSeedComponent } from './components/seeds/add-seed/add-seed.component';
import { EditSeedComponent } from './components/seeds/edit-seed/edit-seed.component';
import { SeedListComponent } from './components/seeds/seed-list/seed-list.component';
import { SeedComponent } from './components/seeds/seed/seed.component';
import { PlantComponent } from './components/plants/plant/plant.component';
import { PlantListComponent } from './components/plants/plant-list/plant-list.component';
import { AddPlantComponent } from './components/plants/add-plant/add-plant.component';
import { EditPlantComponent } from './components/plants/edit-plant/edit-plant.component';
import { AddCustomerComponent } from './components/customers/add-customer/add-customer.component';
import { EditCustomerComponent } from './components/customers/edit-customer/edit-customer.component';
import { CustomerListComponent } from './components/customers/customer-list/customer-list.component';
import { ViewCustomerComponent } from './components/customers/view-customer/view-customer.component';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { MyAccountComponent } from './components/my-account/my-account.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { AdminComponent } from './components/admin/admin.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { AuthInterceptor } from './services/Auth/AuthInterceptor.service';
import { CustomerService } from './services/customer.service';
import { FooterComponent } from './components/footer/footer.component';
import { CartComponent } from './components/cart/cart.component';
import { OrderListComponent } from './components/order-list/order-list.component';


@NgModule({
  declarations: [
    AppComponent,
    PlanterComponent,
    PlanterListComponent,
    AddPlanterComponent,
    EditPlanterComponent,
    AddSeedComponent,
    EditSeedComponent,
    SeedListComponent,
    SeedComponent,
    PlantComponent,
    PlantListComponent,
    AddPlantComponent,
    EditPlantComponent,
    AddCustomerComponent,
    EditCustomerComponent,
    CustomerListComponent,
    ViewCustomerComponent,
    LoginComponent,
    LogoutComponent,
    MyAccountComponent,
    WelcomeComponent,
    AdminComponent,
    ForgotPasswordComponent,
    FooterComponent,
    CartComponent,
    OrderListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  
  ],
  providers: [CustomerService,
    { provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
