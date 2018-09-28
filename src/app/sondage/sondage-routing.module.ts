import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SondageformComponent } from "./sondageform/sondageform.component";
import { SondagestatsComponent } from "./sondagestats/sondagestats.component";

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'sondageform',
        component: SondageformComponent,
        data: {
          title: 'Questionnaire'
        }
      },
      {
        path: 'sondagestats',
        component: SondagestatsComponent,
        data: {
          title: 'Satistique sondage'
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SondageRoutingModule { }
