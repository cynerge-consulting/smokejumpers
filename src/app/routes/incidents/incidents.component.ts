import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import axios from 'axios';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-incidents',
  templateUrl: './incidents.component.html',
  styleUrls: ['./incidents.component.scss']
})
export class IncidentsComponent implements OnInit {
  incidents = [];
  headings = [
    {
      label: 'Incident',
      key: '_mission'
    },
    {
      label: 'Type',
      key: '_mode'
    },
    {
      label: 'Name',
      key: '_nameofIncident'
    },
    {
      label: 'Date',
      key: '_incidentDate'
    }
  ];
  settings = {
    name: 'Incident',
    route: 'incidents',
    menuItems: [
      {
        label: 'New Incident',
        action: 'new',
        route: 'incidents/new'
      },
      {
        label: 'Edit Incident',
        action: 'edit',
        route: 'incidents/'
      },
      {
        label: 'Delete Incident',
        action: 'delete',
        route: 'incidents/'
      }
    ]
  };
  year;

  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe((params) => {
      this.year = params.year;
    });
  }

  async ngOnInit() {
    // check session storage for a token
    let token = window.sessionStorage.getItem('token');
    let incs = await axios.get(environment.API_URL + '/incidents', {
      headers: { Authorization: 'Bearer ' + token }
    });
    this.incidents = incs.data.value;
  }
}
