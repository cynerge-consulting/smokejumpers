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

  selected: ''
  menuItems = [{
    name: 'DASHBOARD',
    route: 'dashboard',
    banner: 'assets/images/dashBanner.png',
    hasItems: false
  }, {
    name: 'Incident Information',
    icon: 'incidents.png',
    hasItems: true,
    expanded: false,
    items: [{
      name: 'New Incident',
      route: 'incidents/new',
      banner: 'assets/images/incBanner.png'
    }, {
      name: 'View/Edit Current Year',
      route: 'incidents',
      banner: 'assets/images/incBanner.png'
    }, {
      name: 'View Previous Years',
      route: 'incidents',
      banner: 'assets/images/incBanner.png'
    }]
  }, {
    name: 'View Reports',
    icon: 'reports.png',
    hasItems: true,
    expanded: false,
    items: [{
      name: 'Reports Dashboard',
      route: 'reports',
      banner: 'assets/images/incBanner.png'
    }, {
      name: 'Base Roster',
      route: 'reports',
      banner: 'assets/images/incBanner.png'
    }, {
      name: 'Booster Sheet',
      route: 'reports',
      banner: 'assets/images/incBanner.png'
    }, {
      name: 'Days Off',
      route: 'reports',
      banner: 'assets/images/incBanner.png'
    }]
  }, {
    name: 'Database Management',
    icon: 'reports.png',
    hasItems: true,
    expanded: false,
    items: [{
      name: 'Database Dashboard',
      route: 'database',
      banner: 'assets/images/incBanner.png'
    }, {
      name: 'Jumpers',
      route: 'jumpers',
      banner: 'assets/images/incBanner.png'
    }, {
      name: 'Retired Jumpers',
      route: 'jumpers',
      banner: 'assets/images/incBanner.png'
    }, {
      name: 'Transfer Jumpers',
      route: 'jumpers',
      banner: 'assets/images/incBanner.png'
    }, {
      name: 'Edit LDO',
      route: 'jumpers',
      banner: 'assets/images/incBanner.png'
    }]
  }, {
    name: 'Mapped Actions',
    icon: 'map.png',
    route: 'map',
    hasItems: false
  }, {
    name: 'Booster in Brief',
    icon: 'map.png',
    route: 'booster',
    hasItems: false
  }, {
    name: 'Base Admin',
    icon: 'admin.png',
    route: 'base',
    hasItems: true,
    expanded: false,
    items: [{
      name: 'User Management',
      route: 'admin/users',
      banner: 'assets/images/incBanner.png'
    }, {
      name: 'Download Data',
      route: 'reports',
      banner: 'assets/images/incBanner.png'
    }]
  }]

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  select = (item) => {
    if (item.hasItems) {
      item.expanded = !item.expanded
    } else {
      this.selected = item.name
      if (item.route) {
        this.router.navigate([item.route])
        this.selectedNavItem.emit(item);
      }
    }
  }

}
