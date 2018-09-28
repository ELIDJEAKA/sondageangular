import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";

import { SondageRoutingModule } from "./sondage-routing.module";
import { ChartistModule } from 'ng-chartist';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatchHeightModule } from "../shared/directives/match-height.directive";

import { NgxChartsModule } from '@swimlane/ngx-charts';
import { SondageformComponent } from './sondageform/sondageform.component';
import { SondagestatsComponent } from './sondagestats/sondagestats.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
    imports: [
        CommonModule,
        SondageRoutingModule,
        ChartistModule,
        NgbModule,
        MatchHeightModule,
        FormsModule,
        ReactiveFormsModule,
        NgxChartsModule
    ],
    exports: [],
    declarations: [
        SondageformComponent,
        SondagestatsComponent
    ],
    providers: [],
})
export class SondageModule { }
