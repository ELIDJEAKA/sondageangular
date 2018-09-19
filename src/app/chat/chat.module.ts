import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";


import { ChatRoutingModule } from "./chat-routing.module";

import { ChatComponent } from "./chat.component";

@NgModule({
    imports: [
        CommonModule,
        ChatRoutingModule
    ],
    declarations: [
        ChatComponent
    ]
})
export class ChatModule { }
