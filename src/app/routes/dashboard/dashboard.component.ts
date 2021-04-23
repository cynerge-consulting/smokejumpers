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
      image: "url('/assets/images/dashBanner.png')",
      route: 'booster'
    },
    {
      title: 'Incidents',
      description: 'View Incidents across bases',
      image: "url('/assets/images/dbmBanner.png')",
      route: 'incidents'
    },
    {
      title: 'Parachutes',
      description: 'Information about Parachutes',
      image: "url('/assets/images/repBanner.png')",
      route: 'chutes'
    },
    {
      title: 'Jumpers',
      description: 'View and Manage Jumpers',
      image: "url('/assets/images/incBanner.png')",
      route: 'jumpers'
    },
    {
      title: 'Aircraft',
      description: 'Information about Aircraft',
      image: "url('/assets/images/repBanner.png')",
      route: 'aircraft'
    },
    {
      title: 'Pilots',
      description: 'View Pilot Information',
      image: "url('/assets/images/dashBanner.png')",
      route: 'pilots'
    },
    {
      description: 'Review Daily and Annual Reports',
      image: "url('/assets/images/repBanner.png')",
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
