import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddPlantComponent } from './plants/add-plant.component';
import { PlantListComponent } from './plants/plant-list.component';
import { PlantComponent } from './plants/plant.component';
import { EditPlantComponent } from './plants/edit-plant.component';
const routes: Routes = [
{path:'plants',component:PlantListComponent},
{path:'plants/:id',component:PlantComponent},
{path:'edit-plant/:id',component:EditPlantComponent},
{path:'add-plant',component:AddPlantComponent}


];
@NgModule({
imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }
