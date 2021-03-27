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
      label: 'Chute',
      key: 'main'
    },
    {
      label: 'Chute Type',
      key: 'chuteType'
    },
    {
      label: 'Chute Size',
      key: 'chuteSize'
    },
    {
      label: 'Base ID',
      key: 'base'
    }
  ];
  settings = {
    label: 'New Chute',
    action: 'create',
    target: 'chutes',
    route: 'chutes'
  };

  constructor() {}

  async ngOnInit() {
    let chutes = await axios.get(environment.API_URL + '/chutemain');
    this.chutes = chutes.data;
  }
}
