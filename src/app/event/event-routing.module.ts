import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EventComponent } from "./event.component";


// import { AuthGuard } from '../auth.guard';


const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: EventComponent,
        // canActivate: [AuthGuard],
      }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class EventRoutingModule { }

export const routedComponents = [EventComponent];
