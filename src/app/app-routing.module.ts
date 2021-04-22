import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './routes/dashboard/dashboard.component';
import { DatabaseComponent } from './routes/database/database.component';
import { WelcomeComponent } from './routes/welcome/welcome.component';
import { IncidentsComponent } from './routes/incidents/incidents.component';
import { NewIncidentComponent } from './routes/incidents/new-incident/new-incident.component';
import { JumpersComponent } from './routes/jumpers/jumpers.component';
import { AircraftComponent } from './routes/aircraft/aircraft.component';
import { NewAircraftComponent } from './routes/aircraft/new-aircraft/new-aircraft.component';
import { NewJumperComponent } from './routes/jumpers/new-jumper/new-jumper.component';
import { TransferJumperComponent } from './routes/jumpers/transfer-jumper/transfer-jumper.component';
import { EditLdoComponent } from './routes/jumpers/edit-ldo/edit-ldo.component';
import { BoosterComponent } from './routes/booster/booster.component';
import { ReportsComponent } from './routes/reports/reports.component';
import { BasesComponent } from './routes/bases/bases.component';
import { NewBaseComponent } from './routes/bases/new-base/new-base.component';
import { PilotsComponent } from './routes/pilots/pilots.component';
import { NewPilotComponent } from './routes/pilots/new-pilot/new-pilot.component';
import { ChutesComponent } from './routes/chutes/chutes.component';
import { NewChuteComponent } from './routes/chutes/new-chute/new-chute.component';
import { QualificationsComponent } from './routes/qualifications/qualifications.component';
import { NewQualificationComponent } from './routes/qualifications/new-qualification/new-qualification.component';
import { UsersComponent } from './routes/users/users.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
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
  {
    path: 'aircraft',
    component: AircraftComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'aircraft/new',
    component: NewAircraftComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'aircraft/:id',
    component: NewAircraftComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'jumpers',
    component: JumpersComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'jumpers/new',
    component: NewJumperComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'jumpers/transfer',
    component: TransferJumperComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'jumpers/ldo',
    component: EditLdoComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'jumpers/:id',
    component: NewJumperComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'reports',
    component: ReportsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'admin/users',
    component: UsersComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'bases',
    component: BasesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'bases/new',
    component: NewBaseComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'bases/:id',
    component: NewBaseComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'pilots',
    component: PilotsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'pilots/new',
    component: NewPilotComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'pilots/:id',
    component: NewPilotComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'chutes',
    component: ChutesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'chutes/new',
    component: NewChuteComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'chutes/:id',
    component: NewChuteComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'qualifications',
    component: QualificationsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'qualifications/new',
    component: NewQualificationComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'qualifications/:id',
    component: NewQualificationComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'booster',
    component: BoosterComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
