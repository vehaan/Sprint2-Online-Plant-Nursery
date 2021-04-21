import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderListComponent } from './order/order-list.component';
import { OrderComponent } from './order/order.component';
import { AddOrderComponent } from './order/add-order.component';
import { EditOrderComponent } from './order/edit-order.component';

const routes: Routes = [
  {path:'plants',component: OrderListComponent},
{path:'plants/:id',component: OrderComponent},
{path:'edit-order/:id',component: EditOrderComponent},
{path:'add-plant',component: AddOrderComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
