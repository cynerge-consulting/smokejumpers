import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DashboardComponent } from './routes/dashboard/dashboard.component';
import { IncidentsComponent } from './routes/incidents/incidents.component';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { TableComponent } from './components/table/table.component';
import { NewIncidentComponent } from './routes/incidents/new-incident/new-incident.component';
import { ReportsComponent } from './routes/reports/reports.component';
import { DatabaseComponent } from './routes/database/database.component';
import { JumpersComponent } from './routes/jumpers/jumpers.component';
import { NewJumperComponent } from './routes/jumpers/new-jumper/new-jumper.component';
import { BoosterComponent } from './routes/booster/booster.component';
import { UsersComponent } from './routes/admin/users/users.component';
import { MapComponent } from './routes/map/map.component';

@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    NavbarComponent,
    DashboardComponent,
    IncidentsComponent,
    DropdownComponent,
    TableComponent
    TableComponent,
    NewIncidentComponent,
    ReportsComponent,
    DatabaseComponent,
    JumpersComponent,
    NewJumperComponent,
    BoosterComponent,
    UsersComponent,
    MapComponent
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
