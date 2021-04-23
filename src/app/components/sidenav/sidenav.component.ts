import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import * as reportsData from '../../routes/reports/reports.json';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  @Input() expanded: boolean;
  @Output() selectedNavItem = new EventEmitter<Object>();

  selected: '';
  menuItems = [];

  constructor(private router: Router) {}

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
        route: 'incidents',
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
        route: 'jumpers',
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
      this.selected = item.name;
      if (item.route) {
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
