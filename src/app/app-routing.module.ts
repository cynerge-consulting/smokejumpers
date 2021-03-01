import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './routes/dashboard/dashboard.component';
import { IncidentsComponent } from './routes/incidents/incidents.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'incidents', component: IncidentsComponent },
  { path: 'jumpers', component: IncidentsComponent },
  { path: 'equipment', component: IncidentsComponent },
  { path: 'bases', component: IncidentsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
