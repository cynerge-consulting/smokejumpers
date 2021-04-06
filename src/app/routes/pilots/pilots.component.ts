import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { environment } from '../../../environments/environment';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-pilots',
  templateUrl: './pilots.component.html',
  styleUrls: ['./pilots.component.scss']
})
export class PilotsComponent implements OnInit {
  pilots = [];
  headings = [
    {
      label: 'Pilot',
      key: 'fullName'
    },
    {
      label: 'Base',
      key: 'baseCode'
    },
    {
      label: 'Affiliation',
      key: 'affiliation'
    },
    {
      label: 'Active',
      key: 'active'
    }
  ];
  settings = {
    label: 'New Chute',
    action: 'create',
    target: 'pilots',
    route: 'pilots'
  };

  constructor(private toast: ToastService) {}

  ngOnInit() {
    this.refreshPilots();
  }

  delete = async (pilot) => {
    let token = window.sessionStorage.getItem('token');
    let userId = 111;
    // let userInfo = window.sessionStorage.getItem('userInfo')
    // let userId = userInfo.id
    let id = '';
    if (pilot.id) {
      id = pilot.id;
    } else if (pilot.href) {
      id = pilot.href.slice(
        pilot.href.indexOf('/pilots/') + '/pilots/'.length,
        pilot.href.length
      );
    }
    let deleted = await axios
      .delete(
        environment.API_URL + '/pilots/' + id + '/delete?userId=' + userId,
        {
          headers: { Authorization: 'Bearer ' + token }
        }
      )
      .then((response) => {
        this.toast.show('Deleted Pilot', 'success');
        this.refreshPilots();
      })
      .catch((error) => {
        this.toast.show('Unable to Delete Pilot', 'error');
      });
  };

  refreshPilots = () => {
    // check session storage for a token
    let token = window.sessionStorage.getItem('token');
    axios
      .get(environment.API_URL + '/pilots', {
        headers: { Authorization: 'Bearer ' + token }
      })
      .then((response) => {
        this.pilots = response.data.value;
        this.pilots.forEach((pilot) => {
          pilot.fullName = pilot.firstName + ' ' + pilot.lastName;
        });
      })
      .catch((error) => {
        this.toast.show('Unable to retreive pilots list.', 'error');
      });
  };
}
