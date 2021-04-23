import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';
import { AddOrderComponent } from './components/order/add-order.component';
import { AddPlanterComponent } from './components/planter/add-planter.component';
import { EditPlanterComponent } from './components/planter/edit-planter.component';
import { PlanterListComponent } from './components/planter/planter-list.component';
import { PlanterComponent } from './components/planter/planter.component';

const routes: Routes = [
  { path: 'addPlanter',component: AddPlanterComponent},
  {path:'edit-planter/:id',component:EditPlanterComponent},
  {path:'planter-list',component:PlanterListComponent},
  {path: 'cart', component: CartComponent},
  { path: 'order', component: AddOrderComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
