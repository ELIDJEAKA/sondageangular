import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';


import { PartisanRoutingModule } from "./partisan-routing.module";

import { PartisanComponent } from "./partisan.component";




@NgModule({
    imports: [
        CommonModule,
        PartisanRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        NgxDatatableModule,
    ],
    declarations: [
      PartisanComponent
    ]
})
export class PartisanModule { }
