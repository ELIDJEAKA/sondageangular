import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EquipeComponent } from "./equipe.component";


// import { AuthGuard } from '../auth.guard';


const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: EquipeComponent,
        // canActivate: [AuthGuard],
      }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class EquipeRoutingModule { }

export const routedComponents = [EquipeComponent];
