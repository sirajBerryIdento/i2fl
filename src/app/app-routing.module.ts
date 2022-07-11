import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IntegratorComponent } from './integrator/integrator.component';
import { WebsocketsComponent } from './websockets/websockets.component';

const routes: Routes = [
  { path: '', component: IntegratorComponent },
  { path: 'websockets', component: WebsocketsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
