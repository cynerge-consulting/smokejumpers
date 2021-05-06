import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { environment } from '../../../environments/environment';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-aircraft',
  templateUrl: './aircraft.component.html',
  styleUrls: ['./aircraft.component.scss']
})
export class AircraftComponent implements OnInit {
  userBase;
  aircraft = [];
  headings = [
    {
      label: 'Callsign',
      key: 'callsign'
    },
    {
      label: 'Make/Model',
      key: 'Aircraft_Name'
    },
    {
      label: 'Tail Number',
      key: 'Aircraft_Tail_Number'
    },
    {
      label: 'Operator',
      key: 'Aircraft_Owner'
    },
    {
      label: 'Active',
      key: 'active'
    }
  ];
  settings = {
    label: 'Aircraft',
    action: 'create',
    target: 'aircraft',
    route: 'aircraft'
  };

  constructor(private toast: ToastService) {}

  async ngOnInit() {
    let token = window.sessionStorage.getItem('token');
    let userInfo = JSON.parse(window.sessionStorage.getItem('userInfo'));
    if (userInfo) {
      this.userBase = userInfo.basecode;
    }
    this.refreshAircraft();
  }

  delete = async (aircraft) => {
    let token = window.sessionStorage.getItem('token');
    let userId = 111;
    let userInfo = JSON.parse(window.sessionStorage.getItem('userInfo'));
    if (userInfo) {
      userId = userInfo.id;
      this.userBase = userInfo.basecode;
    }
    let id = '';
    if (aircraft.id) {
      id = aircraft.id;
    } else if (aircraft.href) {
      id = aircraft.href.slice(
        aircraft.href.indexOf('/travelmodes/') + '/travelmodes/'.length,
        aircraft.href.length
      );
    }
    axios
      .delete(
        environment.API_URL + '/travelmodes/' + id + '/delete?userId=' + userId,
        {
          headers: { Authorization: 'Bearer ' + token }
        }
      )
      .then((response) => {
        this.toast.show('Deleted Aircraft', 'success');
        this.refreshAircraft();
      })
      .catch((error) => {
        this.toast.show('Unable to Delete Aircraft', 'error');
      });
  };

  refreshAircraft = () => {
    // check session storage for a token
    let token = window.sessionStorage.getItem('token');
    let userInfo = JSON.parse(window.sessionStorage.getItem('userInfo'));
    let baseCode = 'BOI';
    if (userInfo) {
      baseCode = userInfo.basecode;
    }
    axios
      .get(environment.API_URL + '/travelmodes?baseCode=' + baseCode, {
        headers: { Authorization: 'Bearer ' + token }
      })
      .then((response) => {
        this.aircraft = response.data.value;
        this.aircraft.forEach((aircraft) => {
          aircraft.active = aircraft.deleted ? 'No' : 'Yes';
        });
      })
      .catch((error) => {
        this.toast.show('Unable to retreive Aircraft.', 'error');
      });
  };
}
