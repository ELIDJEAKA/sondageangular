import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';


import { EventRoutingModule } from "./event-routing.module";

import { EventComponent } from "./event.component";




@NgModule({
    imports: [
        CommonModule,
        EventRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        NgxDatatableModule,
    ],
    declarations: [
      EventComponent
    ]
})
export class EventModule { }
