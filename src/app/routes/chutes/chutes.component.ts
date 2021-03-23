import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-chutes',
  templateUrl: './chutes.component.html',
  styleUrls: ['./chutes.component.scss']
})
export class ChutesComponent implements OnInit {
  chutes = [];
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
      target: 'chutes'
    }
  ];

  constructor() {}

  async ngOnInit() {
    let chutes = await axios.get(environment.API_URL + '/chutemain');
    this.chutes = chutes.data;
  }
}
