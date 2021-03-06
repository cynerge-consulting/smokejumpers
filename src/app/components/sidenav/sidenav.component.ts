import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  @Input() expanded: boolean;
  @Output() selectedNavItem = new EventEmitter<Object>();

  selected: '';
  menuItems = [
    {
      name: 'DASHBOARD',
      route: 'dashboard',
      banner: 'assets/images/dashBanner.png',
      hasItems: false,
      hasParams: false
    },
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
    },
    {
      name: 'View Reports',
      icon: 'reports.png',
      hasItems: true,
      expanded: false,
      items: [
        {
          name: 'Base Roster',
          route: 'reports',
          banner: 'assets/images/incBanner.png',
          hasParams: true,
          params: {
            type: 'baseroster'
          }
        },
        {
          name: 'Booster Sheet',
          route: 'reports',
          banner: 'assets/images/incBanner.png',
          hasParams: true,
          params: {
            type: 'boostersheet'
          }
        },
        {
          name: 'Days Off',
          route: 'reports',
          banner: 'assets/images/incBanner.png',
          hasParams: true,
          params: {
            type: 'daysoff'
          }
        },
        {
          name: 'Last Jumps',
          route: 'reports',
          banner: 'assets/images/incBanner.png',
          hasParams: true,
          params: {
            type: 'lastjump'
          }
        },
        {
          name: 'Last Spotter',
          route: 'reports',
          banner: 'assets/images/incBanner.png',
          hasParams: true,
          params: {
            type: 'lastspotter'
          }
        },
        {
          name: 'ICS Qualifications',
          route: 'reports',
          banner: 'assets/images/incBanner.png',
          hasParams: true,
          params: {
            type: 'ICSQualsALL'
          }
        },
        {
          name: 'Parachute History',
          route: 'reports',
          banner: 'assets/images/incBanner.png',
          hasParams: true,
          params: {
            type: 'chutehistory'
          }
        },
        {
          name: 'Single Resources',
          route: 'reports',
          banner: 'assets/images/incBanner.png',
          hasParams: true,
          params: {
            type: 'srareport'
          }
        },
        {
          name: 'Individual Jump Records',
          route: 'reports',
          banner: 'assets/images/incBanner.png',
          hasParams: true,
          params: {
            type: 'individualjumps'
          }
        },
        {
          name: 'Individual Spotter Assignment',
          route: 'reports',
          banner: 'assets/images/incBanner.png',
          hasParams: true,
          params: {
            type: 'individualspotter'
          }
        },
        {
          name: 'Mission By Aircroft',
          route: 'reports',
          banner: 'assets/images/incBanner.png',
          hasParams: true,
          params: {
            type: 'missionByAircraft'
          }
        },
        {
          name: 'Master Actions',
          route: 'reports',
          banner: 'assets/images/incBanner.png',
          hasParams: true,
          params: {
            type: 'masterAction'
          }
        },
        {
          name: 'Jumpers Nationwide',
          route: 'reports',
          banner: 'assets/images/incBanner.png',
          hasParams: true,
          params: {
            type: 'jumperhbendofyear'
          }
        },
        {
          name: 'Administered Actions',
          route: 'reports',
          banner: 'assets/images/incBanner.png',
          hasParams: true,
          params: {
            type: 'jumperendofyearadmin'
          }
        },
        {
          name: 'National BLM',
          route: 'reports',
          banner: 'assets/images/incBanner.png',
          hasParams: true,
          params: {
            type: 'jumperendofyearblm'
          }
        },
        {
          name: 'Natiomal USFS',
          route: 'reports',
          banner: 'assets/images/incBanner.png',
          hasParams: true,
          params: {
            type: 'jumperendofyearusfs'
          }
        },
        {
          name: 'Nationwide by Base',
          route: 'reports',
          banner: 'assets/images/incBanner.png',
          hasParams: true,
          params: {
            type: 'jumperendofyearbybase'
          }
        }
      ]
    },
    {
      name: 'Database Management',
      icon: 'reports.png',
      hasItems: true,
      expanded: false,
      items: [
        {
          name: 'Database Dashboard',
          route: 'database',
          banner: 'assets/images/incBanner.png'
        },
        {
          name: 'Jumpers',
          route: 'jumpers',
          banner: 'assets/images/incBanner.png'
        },
        {
          name: 'Retired Jumpers',
          route: 'jumpers',
          banner: 'assets/images/incBanner.png'
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
        }
      ]
    },
    {
      name: 'Mapped Actions',
      icon: 'map.png',
      route: 'map',
      hasItems: false
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
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {}

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
