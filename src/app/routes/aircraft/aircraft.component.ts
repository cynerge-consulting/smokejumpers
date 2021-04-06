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

  constructor(private toast: ToastService) {}

  async ngOnInit() {
    let token = window.sessionStorage.getItem('token');
    let aircraft = await axios.get(environment.API_URL + '/travelmodes', {
      headers: { Authorization: 'Bearer ' + token }
    });
    this.aircraft = aircraft.data.value;
  }

  delete = async (aircraft) => {
    let token = window.sessionStorage.getItem('token');
    let userId = 111;
    // let userInfo = window.sessionStorage.getItem('userInfo')
    // let userId = userInfo.id
    let id = '';
    if (aircraft.id) {
      id = aircraft.id;
    } else if (aircraft.href) {
      id = aircraft.href.slice(
        aircraft.href.indexOf('/travelmodes/') + '/travelmodes/'.length,
        aircraft.href.length
      );
    }
    let deleted = await axios
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
    axios
      .get(environment.API_URL + '/travelmodes', {
        headers: { Authorization: 'Bearer ' + token }
      })
      .then((response) => {
        this.aircraft = response.data.value;
      })
      .catch((error) => {
        this.toast.show('Unable to retreive Aircraft.', 'error');
      });
  };
}
