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
  title = 'MADB/MARS - Smokejumpers';
  showingSidenav = true;

  onToggledSidenav = (event) => {
    this.showingSidenav = event;
  }

}
