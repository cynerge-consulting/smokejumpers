import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './routes/dashboard/dashboard.component';
import { MapComponent } from './routes/map/map.component';
import { DatabaseComponent } from './routes/database/database.component';
import { IncidentsComponent } from './routes/incidents/incidents.component';
import { NewIncidentComponent } from './routes/incidents/new-incident/new-incident.component';
import { JumpersComponent } from './routes/jumpers/jumpers.component';
import { AircraftComponent } from './routes/aircraft/aircraft.component';
import { NewJumperComponent } from './routes/jumpers/new-jumper/new-jumper.component';
import { UsersComponent } from './routes/admin/users/users.component';
import { BoosterComponent } from './routes/booster/booster.component';
import { ReportsComponent } from './routes/reports/reports.component';
import { BasesComponent } from './routes/bases/bases.component';
import { PilotsComponent } from './routes/pilots/pilots.component';
import { ChutesComponent } from './routes/chutes/chutes.component';
import { QualificationsComponent } from './routes/qualifications/qualifications.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'map', component: MapComponent },
  { path: 'database', component: DatabaseComponent },
  { path: 'incidents', component: IncidentsComponent },
  {
    path: 'incidents/new',
    component: NewIncidentComponent
  },
  // {
  //   path: 'incidents/new',
  //   component: NewIncidentComponent,
  //   canActivate: [AuthGuard]
  // },
  { path: 'aircraft', component: AircraftComponent },
  { path: 'jumpers', component: JumpersComponent },
  { path: 'jumpers/new', component: NewJumperComponent },
  { path: 'reports', component: ReportsComponent },
  { path: 'admin/users', component: UsersComponent },
  { path: 'bases', component: BasesComponent },
  { path: 'pilots', component: PilotsComponent },
  { path: 'chutes', component: ChutesComponent },
  { path: 'qualifications', component: QualificationsComponent },
  { path: 'booster', component: BoosterComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
