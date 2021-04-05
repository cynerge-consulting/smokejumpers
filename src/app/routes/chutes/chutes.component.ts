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
      key: 'name'
    },
    {
      label: 'Chute Type',
      key: 'style'
    },
    {
      label: 'Base',
      key: 'Base'
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
    let token = window.sessionStorage.getItem('token');
    let chutes = await axios.get(environment.API_URL + '/chutemain', {
      headers: { Authorization: 'Bearer ' + token }
    });
    this.chutes = chutes.data.value;
    chutes = await axios.get(environment.API_URL + '/chutedrogue', {
      headers: { Authorization: 'Bearer ' + token }
    });
    this.chutes = this.chutes.concat(chutes.data.value);
    chutes = await axios.get(environment.API_URL + '/chutereserve', {
      headers: { Authorization: 'Bearer ' + token }
    });
    this.chutes = this.chutes.concat(chutes.data.value);

    this.chutes.forEach((chute) => {
      if (chute.main) {
        chute.style = 'Main';
        chute.name = chute.main + ' ' + chute.chuteType;
      }
      if (chute.drogue) {
        chute.style = 'Drogue';
        chute.name = chute.drogue;
      }
      if (chute.reserve) {
        chute.style = 'Reserve';
        chute.name = chute.reserve;
      }
    });
  }
}
