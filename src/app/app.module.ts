import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlanterComponent } from './components/planters/planter/planter.component';
import { PlanterListComponent } from './components/planters/planter-list/planter-list.component';

@NgModule({
  declarations: [
    AppComponent,
    PlanterComponent,
    PlanterListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
