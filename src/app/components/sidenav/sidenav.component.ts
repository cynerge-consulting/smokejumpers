import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  @Input() expanded: boolean;

  selected: ''
  menuItems = [{
    name: 'DASHBOARD',
    icon: 'blabla.png',
    hasItems: false
  }, {
    name: 'Incidents',
    icon: 'incidents.png',
    hasItems: true,
    expanded: false,
    items: [{
      name: 'New Incident'
    }, {
      name: 'View/Edit Current Year'
    }, {
      name: 'View Previous Years'
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

  constructor() { }

  ngOnInit(): void {
  }

  select = (item) => {
    if (item.hasItems) {
      item.expanded = !item.expanded
    } else {
      this.selected = item.name
    }
  }

}
