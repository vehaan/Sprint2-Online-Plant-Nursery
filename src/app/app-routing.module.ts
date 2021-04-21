import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddSeedComponent } from './seeds/add-seed.component';
import { EditSeedComponent } from './seeds/edit-seed.component';
import { SeedListComponent } from './seeds/seed-list.component';
import { SeedComponent } from './seeds/seed.component';

const routes: Routes = [
{path:'seeds',component:SeedListComponent},
{path:'seeds/:id',component:SeedComponent},
{path:'add-seed',component:AddSeedComponent},
{path:'edit-seed/:id',component:EditSeedComponent},
];

@NgModule({
imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule {}