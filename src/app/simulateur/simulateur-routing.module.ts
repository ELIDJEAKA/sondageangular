import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SimulateurComponent } from "./simulateur.component";


// import { AuthGuard } from '../auth.guard';


const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: SimulateurComponent,
        // canActivate: [AuthGuard],
      }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class SimulateurRoutingModule { }

export const routedComponents = [SimulateurComponent];
