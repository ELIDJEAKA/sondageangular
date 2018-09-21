import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';


import { ZoneRoutingModule } from "./zone-routing.module";

import { ZoneComponent } from "./zone.component";




@NgModule({
    imports: [
        CommonModule,
        ZoneRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        NgxDatatableModule,
    ],
    declarations: [
      ZoneComponent
    ]
})
export class ZoneModule { }
