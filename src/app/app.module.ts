import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PlantComponent } from './plants/plant.component';
import { PlantListComponent } from './plants/plant-list.component';
import { AddPlantComponent } from './plants/add-plant.component';
import { EditPlantComponent } from './plants/edit-plant.component';
import{ FormsModule} from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent,
    PlantComponent,
    PlantListComponent,
    AddPlantComponent,
    EditPlantComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
