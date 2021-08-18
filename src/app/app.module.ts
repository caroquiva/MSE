import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HousesComponent } from './houses/houses.component';
import { MenuComponent } from './menu/menu.component';
import {routing, appRoutingProviders} from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ListMembersComponent } from './list-members/list-members.component';
import { FormsModule, NgModel } from '@angular/forms';
import { SortingComponent } from './sorting/sorting.component';
import { FiltersByPipes } from './pipes/filter.pipe';


@NgModule({
  declarations: [
    AppComponent,
    HousesComponent,
    MenuComponent,
    ListMembersComponent,
    SortingComponent,
    FiltersByPipes
  ],
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule,
    routing,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    MaterialModule,
    FormsModule
    
  ],
  providers: [appRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
