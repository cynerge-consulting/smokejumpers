import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-pilots',
  templateUrl: './pilots.component.html',
  styleUrls: ['./pilots.component.scss']
})
export class PilotsComponent implements OnInit {
  pilots = [];
  headings = [
    {
      label: 'ID',
      key: 'id'
    },
    {
      label: 'Text',
      key: 'text'
    },
    {
      label: 'Value',
      key: 'value'
    },
    {
      label: 'Base ID',
      key: 'baseId'
    }
  ];
  settings = [
    {
      label: 'New Chute',
      action: 'create',
      target: 'pilots'
    }
  ];

  constructor() {}

  async ngOnInit() {
    let pilots = await axios.get(environment.API_URL + '/api/pilots');
    this.pilots = pilots.data;
  }
}
