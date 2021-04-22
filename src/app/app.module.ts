import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlanterComponent } from './components/planters/planter/planter.component';
import { PlanterListComponent } from './components/planters/planter-list/planter-list.component';
import { HttpClientModule } from '@angular/common/http';
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
    EditPlantComponent
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
