import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { environment } from '../../../environments/environment';
import { ToastService } from '../../services/toast.service';

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
      key: 'style'
    },
    {
      label: 'Chute Number',
      key: 'name'
    },
    {
      label: 'Chute Type/Model',
      key: 'chuteType'
    },
    {
      label: 'Chute Size',
      key: 'chuteSize'
    },
    {
      label: 'Active',
      key: 'inService'
    }
  ];
  settings = {
    label: 'New Chute',
    action: 'create',
    target: 'chutes',
    route: 'chutes'
  };

  constructor(private toast: ToastService) {}

  ngOnInit() {
    this.refreshChutes();
  }

  refreshChutes = async () => {
    let token = window.sessionStorage.getItem('token');
    let userInfo = JSON.parse(window.sessionStorage.getItem('userInfo'));
    let baseCode = 'BOI';
    if (userInfo) {
      baseCode = userInfo.basecode;
    }
    let chutes = await axios.get(
      environment.API_URL + '/chutemain?baseCode=' + baseCode,
      {
        headers: { Authorization: 'Bearer ' + token }
      }
    );
    this.chutes = chutes.data.value;
    chutes = await axios.get(
      environment.API_URL + '/chutedrogue?baseCode=' + baseCode,
      {
        headers: { Authorization: 'Bearer ' + token }
      }
    );
    this.chutes = this.chutes.concat(chutes.data.value);
    chutes = await axios.get(
      environment.API_URL + '/chutereserve?baseCode=' + baseCode,
      {
        headers: { Authorization: 'Bearer ' + token }
      }
    );
    this.chutes = this.chutes.concat(chutes.data.value);

    this.chutes.forEach((chute) => {
      if (chute.main) {
        chute.style = 'Main';
        chute.name = chute.main;
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
  };

  delete = (chute) => {
    let token = window.sessionStorage.getItem('token');
    let id = chute.href.slice(
      chute.href.lastIndexOf('/') + 1,
      chute.href.length
    );
    if (id.includes('base')) {
      id = id.slice(0, id.indexOf('?'));
    }
    axios
      .delete(
        environment.API_URL +
          '/chute' +
          chute.style.toLowerCase() +
          '/' +
          id +
          '/delete',
        {
          headers: { Authorization: 'Bearer ' + token }
        }
      )
      .then((response) => {
        this.toast.show('Deleted Chute', 'success');
        this.refreshChutes();
      })
      .catch((error) => {
        this.toast.show('Unable to Delete Chute', 'error');
      });
  };
}
