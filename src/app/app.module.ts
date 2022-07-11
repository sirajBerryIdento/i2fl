import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IntegratorComponent } from './integrator/integrator.component';
import { FitnetService } from './_services/fitnet.service';
import { LuccaService } from './_services/lucca.service';
import { HelperComponent } from './helper/helper.component';
import { WebsocketsComponent } from './websockets/websockets.component';
import { WebsocketService } from './_services/Websocket.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    IntegratorComponent,
    HelperComponent,
    WebsocketsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [LuccaService,  FitnetService, WebsocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
