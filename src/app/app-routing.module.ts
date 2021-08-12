/**
 * @author Carolina Quintero Valencia
 * 
 * se declara las rutas utilizadas para la navegación 
 */
import { RouterModule, Routes, Route } from '@angular/router';
import { HousesComponent } from "./houses/houses.component";
import { MenuComponent } from './menu/menu.component';
import {ModuleWithProviders} from '@angular/core';
import { ListMembersComponent } from './list-members/list-members.component';
import { SortingComponent } from './sorting/sorting.component';


const appRoutes: Routes = [
    
        {path: '', component: MenuComponent},
        {path: 'view_houses', component: HousesComponent},
        {path: 'list_members', component: ListMembersComponent},
        {path: 'view_sorting', component: SortingComponent}
    
]
export const appRoutingProviders: any[] = [];

export const routing: ModuleWithProviders<Route> = RouterModule.forRoot(appRoutes);