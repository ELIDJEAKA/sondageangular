import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


import { SimulateurRoutingModule } from "./simulateur-routing.module";

import { SimulateurComponent } from "./simulateur.component";




@NgModule({
    imports: [
        CommonModule,
        SimulateurRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        NgxDatatableModule,
        NgbModule,
    ],
    declarations: [
      SimulateurComponent
    ]
})
export class SimulateurModule { }
