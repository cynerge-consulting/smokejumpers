import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './routes/dashboard/dashboard.component';
import { MapComponent } from './routes/map/map.component';
import { DatabaseComponent } from './routes/database/database.component';
import { WelcomeComponent } from './routes/welcome/welcome.component';
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
  { path: '', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'welcome', component: WelcomeComponent },
  {
    path: 'incidents',
    component: IncidentsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'incidents/new',
    component: NewIncidentComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'incidents/:id',
    component: NewIncidentComponent,
    canActivate: [AuthGuard]
  },
  { path: 'aircraft', component: AircraftComponent, canActivate: [AuthGuard] },
  { path: 'jumpers', component: JumpersComponent, canActivate: [AuthGuard] },
  {
    path: 'jumpers/new',
    component: NewJumperComponent,
    canActivate: [AuthGuard]
  },
  { path: 'reports', component: ReportsComponent, canActivate: [AuthGuard] },
  { path: 'admin/users', component: UsersComponent, canActivate: [AuthGuard] },
  { path: 'bases', component: BasesComponent, canActivate: [AuthGuard] },
  { path: 'pilots', component: PilotsComponent, canActivate: [AuthGuard] },
  { path: 'chutes', component: ChutesComponent, canActivate: [AuthGuard] },
  {
    path: 'qualifications',
    component: QualificationsComponent,
    canActivate: [AuthGuard]
  },
  { path: 'booster', component: BoosterComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
