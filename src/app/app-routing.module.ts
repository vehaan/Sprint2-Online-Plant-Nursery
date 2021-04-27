import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CartComponent } from './components/cart/cart.component';
import { AddCustomerComponent } from './components/customers/add-customer/add-customer.component';
import { CustomerListComponent } from './components/customers/customer-list/customer-list.component';
import { EditCustomerComponent } from './components/customers/edit-customer/edit-customer.component';
import { ViewCustomerComponent } from './components/customers/view-customer/view-customer.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { MyAccountComponent } from './components/my-account/my-account.component';
import { OrderListComponent } from './components/order/order-list/order-list.component';
import { AddOrderComponent } from './components/order/add-order/add-order.component';
import { AddPlanterComponent } from './components/planters/add-planter/add-planter.component';
import { EditPlanterComponent } from './components/planters/edit-planter/edit-planter.component';
import { PlanterListComponent } from './components/planters/planter-list/planter-list.component';
import { PlanterComponent } from './components/planters/planter/planter.component';
import { AddPlantComponent } from './components/plants/add-plant/add-plant.component';
import { EditPlantComponent } from './components/plants/edit-plant/edit-plant.component';
import { PlantListComponent } from './components/plants/plant-list/plant-list.component';
import { PlantComponent } from './components/plants/plant/plant.component';
import { AddSeedComponent } from './components/seeds/add-seed/add-seed.component';
import { EditSeedComponent } from './components/seeds/edit-seed/edit-seed.component';
import { SeedListComponent } from './components/seeds/seed-list/seed-list.component';
import { SeedComponent } from './components/seeds/seed/seed.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { AdminGuard } from './services/Auth/admin-guard.service';
import { AuthGuardService } from './services/Auth/auth-guard.service';
import { CustomerDetailGuard } from './services/Auth/customer-details.guard';
import { AllOrdersComponent } from './components/order/all-orders/all-orders.component';


const routes: Routes = [
  { path: 'add-planter',component: AddPlanterComponent},
  {path:'edit-planter/:id',component:EditPlanterComponent},
  {path:'planters',component:PlanterListComponent},
  {path:'planters/:id',component:PlanterComponent},

  {path:'seeds',component:SeedListComponent},
{path:'seeds/:id',component:SeedComponent},
{path:'add-seed',component:AddSeedComponent},
{path:'edit-seed/:id',component:EditSeedComponent},

{path:'plants',component:PlantListComponent},
{path:'plants/:id',component:PlantComponent},
{path:'edit-plant/:id',component:EditPlantComponent},
{path:'add-plant',component:AddPlantComponent},

{path: 'cart', component: CartComponent},
{ path: 'order-list', component: OrderListComponent},
{ path: 'add-order', component: AddOrderComponent},
{ path: 'allorders', component: AllOrdersComponent },



{path:"app-com",component:AppComponent},
{ path: 'welcome', component: WelcomeComponent},
{path:'account',component:MyAccountComponent,
canActivate:[AuthGuardService]},
{path:'add-customer',component:AddCustomerComponent },
{path:'edit-customer',component:EditCustomerComponent,
canActivate:[AuthGuardService]},
{path:'view-customer/:id',component:ViewCustomerComponent,
canActivate: [CustomerDetailGuard]},
{ path: 'login', component: LoginComponent },
{ path: 'change-password', component: ForgotPasswordComponent },
{ path: 'logout', component: LogoutComponent},
{path:"customer-list",component:CustomerListComponent,
canActivate:[AuthGuardService,AdminGuard]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
