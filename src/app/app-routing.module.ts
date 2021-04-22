import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPlanterComponent } from './components/planters/add-planter/add-planter.component';
import { EditPlanterComponent } from './components/planters/edit-planter/edit-planter.component';
import { PlanterListComponent } from './components/planters/planter-list/planter-list.component';
import { AddPlantComponent } from './components/plants/add-plant/add-plant.component';
import { EditPlantComponent } from './components/plants/edit-plant/edit-plant.component';
import { PlantListComponent } from './components/plants/plant-list/plant-list.component';
import { PlantComponent } from './components/plants/plant/plant.component';
import { AddSeedComponent } from './components/seeds/add-seed/add-seed.component';
import { EditSeedComponent } from './components/seeds/edit-seed/edit-seed.component';
import { SeedListComponent } from './components/seeds/seed-list/seed-list.component';
import { SeedComponent } from './components/seeds/seed/seed.component';

const routes: Routes = [
  { path: 'addPlanter',component: AddPlanterComponent},
  {path:'edit-planter/:id',component:EditPlanterComponent},
  {path:'planters',component:PlanterListComponent},

  {path:'seeds',component:SeedListComponent},
{path:'seeds/:id',component:SeedComponent},
{path:'add-seed',component:AddSeedComponent},
{path:'edit-seed/:id',component:EditSeedComponent},

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
