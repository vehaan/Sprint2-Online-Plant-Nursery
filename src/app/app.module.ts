import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OrderComponent } from './order/order.component';
import { AddOrderComponent } from './order/add-order.component';
import { EditOrderComponent } from './order/edit-order.component';
import { OrderListComponent } from './order/order-list.component';

@NgModule({
  declarations: [
    AppComponent,
    OrderComponent,
    AddOrderComponent,
    EditOrderComponent,
    OrderListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
