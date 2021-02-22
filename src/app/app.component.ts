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
  title = 'smokejumpers';
  showingSidenav = true;

  onToggledSidenav = (event) => {
    this.showingSidenav = event;
  }

}
