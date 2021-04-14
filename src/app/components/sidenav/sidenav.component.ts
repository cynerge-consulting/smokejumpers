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
            name: 'View/Edit Current Year',
            route: 'incidents'
          },
          {
            name: 'View Previous Years',
            route: 'incidents',
            params: {
              archived: true
            }
          }
        ]
      },
      {
        name: 'Jumpers',
        banner: 'assets/images/MarsBanner.jpg',
        route: 'jumpers'
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
        name: 'Bases',
        banner: 'assets/images/MarsBanner.jpg',
        route: 'bases'
      },
      {
        name: 'Reports',
        banner: 'assets/images/repBanner.png',
        route: 'reports'
      }
    ];
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
