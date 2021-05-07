import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import {
  Router,
  ActivatedRoute,
  ParamMap,
  NavigationEnd
} from '@angular/router';
import * as reportsData from '../../routes/reports/reports.json';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  @Input() expanded: boolean;
  @Output() selectedNavItem = new EventEmitter<Object>();

  selected;
  menuItems = [];

  constructor(private router: Router) {
    router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        let urlParts = event.url.split('/');
        if (urlParts[2]) {
          if (urlParts[1] === 'incidents') {
            this.selected = 'incidents/new';
          }
          if (urlParts[1] === 'jumpers') {
            this.selected = 'jumpers';
            if (urlParts[2] === 'transfer') {
              this.selected = 'jumpers/transfer';
            }
            if (urlParts[2] === 'ldo') {
              this.selected = 'jumpers/ldo';
            }
          }
        } else {
          this.selected = urlParts[1];
        }
      }
    });
  }

  ngOnInit(): void {
    let userInfo = JSON.parse(window.sessionStorage.getItem('userInfo'));
    let role = 'admin';
    if (userInfo) {
      role = userInfo.role;
    }

    this.menuItems = [
      {
        name: 'Dashboard',
        banner: 'assets/images/dashBanner.png',
        route: 'dashboard'
      },
      {
        name: 'Incidents',
        banner: 'assets/images/incBanner.png',
        items: [
          {
            name: 'New Incident',
            route: 'incidents/new'
          },
          {
            name: 'View/Edit Incidents',
            route: 'incidents'
          }
        ]
      },
      {
        name: 'Jumpers',
        banner: 'assets/images/MarsBanner.jpg',
        items: [
          {
            name: 'View Jumpers',
            route: 'jumpers'
          },
          {
            name: 'Transfer Jumper',
            route: 'jumpers/transfer'
          },
          {
            name: 'Edit LDO',
            route: 'jumpers/ldo'
          }
        ]
      },
      {
        name: 'Pilots',
        banner: 'assets/images/dbmBanner.png',
        route: 'pilots'
      },
      {
        name: 'Aircraft',
        banner: 'assets/images/dashBanner.png',
        route: 'aircraft'
      },
      {
        name: 'Parachutes',
        banner: 'assets/images/dbmBanner.png',
        route: 'chutes'
      },
      {
        name: 'Qualifications',
        banner: 'assets/images/dbmBanner.png',
        route: 'qualifications'
      },
      {
        name: 'Spike Bases',
        banner: 'assets/images/MarsBanner.jpg',
        route: 'bases'
      },
      {
        name: 'Reports',
        banner: 'assets/images/repBanner.png',
        route: 'reports'
      }
    ];

    if (role === 'baseadmin' || role === 'sysadmin' || role === 'admin') {
      this.menuItems.push({
        name: 'User Management',
        banner: 'assets/images/dbmBanner.png',
        route: 'users'
      });
    }
  }

  select = (item) => {
    if (item.items) {
      item.expanded = !item.expanded;
    } else {
      if (item.route) {
        this.selected = item.route;
        if (item.params) {
          this.router.navigate([item.route, item.params]);
        } else {
          this.router.navigate([item.route]);
        }
        this.selectedNavItem.emit(item);
      }
    }
  };
}
