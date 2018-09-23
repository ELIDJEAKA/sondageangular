import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';


import { EquipeRoutingModule } from "./equipe-routing.module";

import { EquipeComponent } from "./equipe.component";




@NgModule({
    imports: [
        CommonModule,
        EquipeRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        NgxDatatableModule,
    ],
    declarations: [
      EquipeComponent
    ]
})
export class EquipeModule { }
