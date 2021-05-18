import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import axios from 'axios';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  headerImage = "url('assets/images/dashBanner.png')";
  cards = [
    {
      title: 'Incidents',
      description: 'View Incidents across bases',
      image: "url('assets/images/incidents.png')",
      route: 'incidents'
    },
    {
      title: 'Jumpers',
      description: 'View and Manage Jumpers',
      image: "url('assets/images/jumpers.png')",
      route: 'jumpers'
    },
    {
      title: 'Pilots',
      description: 'View Pilot Information',
      image: "url('assets/images/pilots.png')",
      route: 'pilots'
    },
    {
      title: 'Aircraft',
      description: 'Information about Aircraft',
      image: "url('assets/images/aircraft.png')",
      route: 'aircraft'
    },
    {
      title: 'Parachutes',
      description: 'Information about Parachutes',
      image: "url('assets/images/chutes.png')",
      route: 'chutes'
    },
    {
      description: 'Review Daily and Annual Reports',
      image: "url('assets/images/reports.png')",
      title: 'Reports',
      route: 'reports'
    }
  ];
  base: '';

  constructor(private router: Router) {
    let userInfo = JSON.parse(window.sessionStorage.getItem('userInfo'));
    this.base = userInfo.basecode;
  }

  ngOnInit(): void {
    this.getBases();
  }

  go = (route) => {
    this.router.navigate([route]);
  };

  getBases = () => {
    let token = window.sessionStorage.getItem('token');
    axios
      .get(environment.API_URL + '/base/dropdown/main', {
        headers: { Authorization: 'Bearer ' + token }
      })
      .then((response) => {
        let bases = response.data;
        let base = bases.filter((base) => {
          return base.baseCode === this.base;
        });
        this.base = base[0].text;
      });
  };
}
