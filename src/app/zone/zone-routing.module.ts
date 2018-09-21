import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ZoneComponent } from "./zone.component";


// import { AuthGuard } from '../auth.guard';


const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: ZoneComponent,
        // canActivate: [AuthGuard],
      }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ZoneRoutingModule { }

export const routedComponents = [ZoneComponent];
