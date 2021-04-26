import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { PaymentComponent } from './payment/payment.component';
import { AddSeedComponent } from './seeds/add-seed.component';
import { EditSeedComponent } from './seeds/edit-seed.component';
import { SeedListComponent } from './seeds/seed-list.component';
import { SeedComponent } from './seeds/seed.component';

const routes: Routes = [
{path:'seeds',component:SeedListComponent},
{path:'seeds/:id',component:SeedComponent},
{path:'add-seed',component:AddSeedComponent},
{path:'edit-seed/:id',component:EditSeedComponent},
{path:'payment',component:PaymentComponent},
{path:'',component:HomepageComponent}

];

@NgModule({
imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule {}