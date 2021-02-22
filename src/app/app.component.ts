import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  location = {
    path: '',
    banner: 'assets/images/dashBanner.png',
    title: 'Dashboard'
  }
  title = 'MADB/MARS';
  showingSidenav = true;

  onToggledSidenav = (event) => {
    this.showingSidenav = event;
  }

  onSelectedNavItem = (event) => {
    this.location.title = event.name
    this.location.banner = event.banner
    this.title = event.name
  }

}
