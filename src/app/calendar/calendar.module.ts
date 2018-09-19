import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule } from '@angular/forms';

import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { CalendarModule, CalendarDateFormatter } from 'angular-calendar';
import { CalendarRoutingModule } from "./calendar-routing.module";

import { CalendarsComponent } from "./calendar.component";

@NgModule({
    imports: [
        CommonModule,
        CalendarRoutingModule,
        CalendarModule.forRoot(),
        NgbModalModule.forRoot(),
        FormsModule
    ],
    declarations: [
        CalendarsComponent
    ]
})
export class CalendarsModule { }
