import { Component } from '@angular/core';
import {
  Router,
  ActivatedRoute,
  ParamMap,
  NavigationEnd
} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private router: Router) {
    router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        let urlParts = event.url.split('/');
        let title = urlParts[1];
        title = title[0].toUpperCase() + title.slice(1, title.length);
        this.location.title = title;
      }
    });
  }

  location = {
    path: '',
    banner: 'assets/images/dashBanner.png',
    title: 'Dashboard'
  };
  title = 'MADB/MARS';
  showingSidenav = true;

  onToggledSidenav = (event) => {
    this.showingSidenav = event;
  };

  onSelectedNavItem = (event) => {
    this.location.title = event.name;
    this.location.banner = event.banner;
    this.title = event.name;
  };
}
