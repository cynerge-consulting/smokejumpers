import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DashboardComponent } from './routes/dashboard/dashboard.component';
import { IncidentsComponent } from './routes/incidents/incidents.component';
import { TableComponent } from './components/table/table.component';
import { NewIncidentComponent } from './routes/incidents/new-incident/new-incident.component';
import { ReportsComponent } from './routes/reports/reports.component';
import { DatabaseComponent } from './routes/database/database.component';
import { JumpersComponent } from './routes/jumpers/jumpers.component';
import { NewJumperComponent } from './routes/jumpers/new-jumper/new-jumper.component';
import { BoosterComponent } from './routes/booster/booster.component';
import { UsersComponent } from './routes/admin/users/users.component';
import { AircraftComponent } from './routes/aircraft/aircraft.component';
import { ChutesComponent } from './routes/chutes/chutes.component';
import { PilotsComponent } from './routes/pilots/pilots.component';
import { BasesComponent } from './routes/bases/bases.component';
import { QualificationsComponent } from './routes/qualifications/qualifications.component';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { ButtonComponent } from './components/button/button.component';
import { FormComponent } from './components/form/form.component';
import { FormsModule } from '@angular/forms';
import { WelcomeComponent } from './routes/welcome/welcome.component';
import { ToastComponent } from './components/toast/toast.component';
import { NewQualificationComponent } from './routes/qualifications/new-qualification/new-qualification.component';
import { NewPilotComponent } from './routes/pilots/new-pilot/new-pilot.component';
import { NewAircraftComponent } from './routes/aircraft/new-aircraft/new-aircraft.component';

@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    NavbarComponent,
    DashboardComponent,
    IncidentsComponent,
    TableComponent,
    NewIncidentComponent,
    ReportsComponent,
    DatabaseComponent,
    JumpersComponent,
    NewJumperComponent,
    BoosterComponent,
    UsersComponent,
    AircraftComponent,
    ChutesComponent,
    PilotsComponent,
    BasesComponent,
    QualificationsComponent,
    DropdownComponent,
    ButtonComponent,
    FormComponent,
    WelcomeComponent,
    ToastComponent,
    NewQualificationComponent,
    NewPilotComponent,
    NewAircraftComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
