import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-aircraft',
  templateUrl: './aircraft.component.html',
  styleUrls: ['./aircraft.component.scss']
})
export class AircraftComponent implements OnInit {
  aircraft = [];
  headings = [
    {
      label: 'Name',
      key: 'Aircraft_Name'
    },
    {
      label: 'Tail Number',
      key: 'Aircraft_Tail_Number'
    },
    {
      label: 'Owner',
      key: 'Aircraft_Owner'
    },
    {
      label: 'Callsign',
      key: 'callsign'
    },
    {
      label: 'Base',
      key: 'homeBase'
    }
  ];
  settings = {
    label: 'Aircraft',
    action: 'create',
    target: 'aircraft',
    route: 'aircraft'
  };

  constructor() {}

  async ngOnInit() {
    let token = window.sessionStorage.getItem('token');
    let aircraft = await axios.get(environment.API_URL + '/travelmodes', {
      headers: { Authorization: 'Bearer ' + token }
    });
    this.aircraft = aircraft.data.value;
  }
}
