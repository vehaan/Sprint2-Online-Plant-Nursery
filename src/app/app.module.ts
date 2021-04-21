import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlanterComponent } from './components/planters/planter/planter.component';
import { PlanterListComponent } from './components/planters/planter-list/planter-list.component';
import { HttpClientModule } from '@angular/common/http';
import { AddPlanterComponent } from './components/add-planter/add-planter.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditPlanterComponent } from './components/edit-planter/edit-planter.component';

@NgModule({
  declarations: [
    AppComponent,
    PlanterComponent,
    PlanterListComponent,
    AddPlanterComponent,
    EditPlanterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
