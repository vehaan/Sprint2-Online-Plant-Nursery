import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPlanterComponent } from './components/add-planter/add-planter.component';
import { EditPlanterComponent } from './components/edit-planter/edit-planter.component';
import { PlanterListComponent } from './components/planters/planter-list/planter-list.component';

const routes: Routes = [
  { path: 'addPlanter',component: AddPlanterComponent},
  {path:'edit-planter/:id',component:EditPlanterComponent},
  {path:'planter-list',component:PlanterListComponent}
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
