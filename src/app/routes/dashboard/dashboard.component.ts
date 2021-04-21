import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  cards = [
    {
      title: 'Booster in Brief',
      description: 'Information about Boosters',
      route: 'booster'
    },
    {
      title: 'Incidents',
      description: 'View Incidents across bases',
      route: 'incidents'
    },
    {
      title: 'Parachutes',
      description: 'Information about Parachutes',
      route: 'chutes'
    },
    {
      title: 'Jumpers',
      description: 'View and Manage Jumpers',
      route: 'jumpers'
    },
    {
      title: 'Aircraft',
      description: 'Information about Aircraft',
      route: 'aircraft'
    },
    {
      title: 'Pilots',
      description: 'View Pilot Information',
      route: 'pilots'
    },
    {
      description: 'Review Daily and Annual Reports',
      title: 'Reports',
      route: 'reports'
    }
  ];
  constructor(private router: Router) {}

  ngOnInit(): void {}

  go = (route) => {
    this.router.navigate([route]);
  };
}
