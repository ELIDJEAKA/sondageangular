import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PartisanComponent } from "./partisan.component";


// import { AuthGuard } from '../auth.guard';


const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: PartisanComponent,
        // canActivate: [AuthGuard],
      }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PartisanRoutingModule { }

export const routedComponents = [PartisanComponent];
