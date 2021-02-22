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
    name: 'Incidents',
    icon: 'incidents.png',
    hasItems: true,
    expanded: false,
    items: [{
      name: 'New Incident',
      route: 'incidents',
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
    name: 'Reports',
    icon: 'reports.png',
    hasItems: true,
    expanded: false,
    items: [{
      name: 'Reports Dashboard'
    }, {
      name: 'Base Roster'
    }, {
      name: 'Booster Sheet'
    }, {
      name: 'Days Off'
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
