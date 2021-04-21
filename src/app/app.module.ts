import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SeedListComponent } from './seeds/seed-list.component';
import { SeedComponent } from './seeds/seed.component';
import { AddSeedComponent } from './seeds/add-seed.component';
import { EditSeedComponent } from './seeds/edit-seed.component';

@NgModule({
  declarations: [
    AppComponent,
    SeedListComponent,
    SeedComponent,
    AddSeedComponent,
    EditSeedComponent
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
