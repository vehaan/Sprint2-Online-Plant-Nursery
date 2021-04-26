import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CartComponent } from './components/cart/cart.component';
import { AddOrderComponent } from './components/order/add-order.component';
import { AllOrdersComponent } from './components/order/all-orders.component';
import { OrderListComponent } from './components/order/order-list.component';
import { OrderComponent } from './components/order/order.component';
import { AddPlanterComponent } from './components/planter/add-planter.component';
import { EditPlanterComponent } from './components/planter/edit-planter.component';
import { PlanterListComponent } from './components/planter/planter-list.component';
import { PlanterComponent } from './components/planter/planter.component';


@NgModule({
  declarations: [
    AppComponent,
    AddOrderComponent,
    OrderListComponent,
    OrderComponent,
    PlanterListComponent,
    PlanterComponent,
    AddPlanterComponent,
    EditPlanterComponent,
    CartComponent,
    AllOrdersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [ ],
  bootstrap: [AppComponent]
})
export class AppModule { }
