import { Component, OnInit } from '@angular/core';
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

  constructor() { }

  async ngOnInit() {
    let incs = await axios.get(environment.API_URL + '/api/incidents');
    this.incidents = incs.data.value;
  }
}
