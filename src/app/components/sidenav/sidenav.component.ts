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
        name: 'Incident Information',
        icon: 'incidents.png',
        hasItems: true,
        hasParams: false,
        expanded: false,
        items: [
          {
            name: 'New Incident',
            route: 'incidents/new',
            banner: 'assets/images/incBanner.png'
          },
          {
            name: 'View/Edit Current Year',
            route: 'incidents',
            hasParams: true,
            params: {
              year: 'current'
            },
            banner: 'assets/images/incBanner.png'
          },
          {
            name: 'View Previous Years',
            route: 'incidents',
            banner: 'assets/images/incBanner.png',
            hasParams: true,
            params: {
              year: 'previous'
            }
          }
        ]
      }
    ];

    let reportsNav = {
      name: 'View Reports',
      icon: 'reports.png',
      hasItems: true,
      expanded: false,
      items: reportsData.reports
    };

    // push reports from configs into nav menu
    this.menuItems.push(reportsNav);

    this.menuItems.push(
      {
        name: 'Database Management',
        icon: 'reports.png',
        hasItems: true,
        expanded: false,
        items: [
          {
            name: 'Jumpers',
            route: 'jumpers',
            banner: 'assets/images/incBanner.png',
            hasParams: true,
            params: {
              retired: false
            }
          },
          {
            name: 'Retired Jumpers',
            route: 'jumpers',
            banner: 'assets/images/incBanner.png',
            hasParams: true,
            params: {
              retired: true
            }
          },
          {
            name: 'Transfer Jumpers',
            route: 'jumpers',
            banner: 'assets/images/incBanner.png'
          },
          {
            name: 'Edit LDO',
            route: 'jumpers',
            banner: 'assets/images/incBanner.png'
          },
          {
            name: 'Aircraft',
            route: 'aircraft',
            banner: 'assets/images/incBanner.png'
          },
          {
            name: 'Parachutes',
            route: 'chutes',
            banner: 'assets/images/incBanner.png'
          },
          {
            name: 'Spike Bases',
            route: 'bases',
            banner: 'assets/images/incBanner.png'
          },
          {
            name: 'Pilots',
            route: 'pilots',
            banner: 'assets/images/incBanner.png'
          },
          {
            name: 'Qualifications',
            route: 'qualifications',
            banner: 'assets/images/incBanner.png'
          }
        ]
      },
      {
        name: 'Booster in Brief',
        icon: 'map.png',
        route: 'booster',
        hasItems: false
      },
      {
        name: 'Base Admin',
        icon: 'admin.png',
        route: 'base',
        hasItems: true,
        expanded: false,
        items: [
          {
            name: 'User Management',
            route: 'admin/users',
            banner: 'assets/images/incBanner.png'
          },
          {
            name: 'Download Data',
            route: 'reports',
            banner: 'assets/images/incBanner.png'
          }
        ]
      }
    );
  }

  select = (item) => {
    if (item.hasItems) {
      item.expanded = !item.expanded;
    } else {
      this.selected = item.name;
      if (item.route) {
        if (item.hasParams) {
          this.router.navigate([item.route, item.params]);
        } else {
          this.router.navigate([item.route]);
        }
        this.selectedNavItem.emit(item);
      }
    }
  };
}
