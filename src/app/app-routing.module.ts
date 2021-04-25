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
import { OrderListComponent } from './components/order-list/order-list.component';
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
import { AuthGaurdService } from './services/Auth/auth-guard.service';
import { CustomerDetailGuard } from './services/Auth/customer-details.service';

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
{ path: 'orders', component: OrderListComponent},



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
