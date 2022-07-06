import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IntegratorComponent } from './integrator/integrator.component';
import { FitnetService } from './_services/fitnet.service';
import { LuccaService } from './_services/lucca.service';
import { HelperComponent } from './helper/helper.component';
import { SynchronizedComponent } from './synchronization/synchronized/synchronized.component';
import { SynchronizedService } from './_services/synchronized.service';

@NgModule({
  declarations: [
    AppComponent,
    IntegratorComponent,
    HelperComponent,
    SynchronizedComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [LuccaService,  FitnetService,SynchronizedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
