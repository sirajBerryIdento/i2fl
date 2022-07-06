import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IntegratorComponent } from './integrator/integrator.component';
import { SynchronizedComponent } from './synchronization/synchronized/synchronized.component';

const routes: Routes = [
  { path: '', component: IntegratorComponent },
  { path: 'synchronized', component: SynchronizedComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
