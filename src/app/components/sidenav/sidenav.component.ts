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
    name: 'Dashboard',
    route: 'dashboard',
    banner: 'assets/images/dashBanner.png'
  }, {
    name: 'Incidents',
    route: 'incidents',
    banner: 'assets/images/incBanner.png'
  }, {
    name: 'Jumpers',
    route: 'jumpers',
    banner: 'assets/images/repBanner.png'
  }, {
    name: 'Equipment',
    route: 'equipment',
    banner: 'assets/images/dbmBanner.png'
  }, {
    name: 'Bases',
    route: 'bases',
    banner: 'assets/images/MarsBanner.jpg'
  }]

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  select = (item) => {
    this.selected = item.name
    if (item.route) {
      this.router.navigate([item.route])
      this.selectedNavItem.emit(item);
    }
  }

}
