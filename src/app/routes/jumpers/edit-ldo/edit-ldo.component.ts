import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { environment } from '../../../../environments/environment';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'app-edit-ldo',
  templateUrl: './edit-ldo.component.html',
  styleUrls: [
    './edit-ldo.component.scss',
    '../../../components/form/form.component.scss'
  ]
})
export class EditLdoComponent implements OnInit {
  baseCode;
  baseId;
  jumpers;
  originalJumpers;
  selectedDate;
  bases;
  selectedBase = {
    value: '',
    name: '',
    baseId: ''
  };
  buttonText = 'Update Last Day Off';

  constructor(private toast: ToastService) {}

  ngOnInit(): void {
    let token = window.sessionStorage.getItem('token');
    axios
      .get(environment.API_URL + '/base/dropdown/main', {
        headers: { Authorization: 'Bearer ' + token }
      })
      .then((response) => {
        this.bases = response.data;
      })
      .catch((error) => {
        console.dir(error);
      });

    this.refreshJumpers();
  }

  refreshJumpers = () => {
    let token = window.sessionStorage.getItem('token');
    let activeJumpers = [];
    axios
      .get(environment.API_URL + '/jumpers', {
        headers: { Authorization: 'Bearer ' + token }
      })
      .then((response) => {
        this.jumpers = response.data.value;
        this.jumpers.forEach((jumper) => {
          jumper.name =
            jumper.firstName + ' ' + jumper.lastName + ' | ' + jumper.base.code;

          if (jumper.lastDayOff) {
            let ldo_friendly = jumper.lastDayOff.slice(0, 10);
            let ldo = ldo_friendly.split('-');
            jumper.ldo = ldo[1] + '/' + ldo[2] + '/' + ldo[0];
          }
          if (jumper.activeStatus) {
            activeJumpers.push(jumper);
          }
        });
        this.originalJumpers = activeJumpers;
        this.jumpers = [];
      })
      .catch((error) => {
        console.dir(error);
      });
  };

  selectBase = (base) => {
    this.selectedBase = base;

    this.jumpers = this.originalJumpers;

    // filter jumpers by base
    let filteredJumpers = [];
    this.jumpers.forEach((jumper) => {
      if (jumper.baseId === this.selectedBase.baseId) {
        filteredJumpers.push(jumper);
      }
    });

    // dedupe jumpers
    let uniqueJumpers = [...new Set(filteredJumpers)];
    this.jumpers = uniqueJumpers;
  };

  isDisabled = () => {
    if (!this.selectedDate || this.selectedBase.baseId === '') {
      return true;
    } else {
      return false;
    }
  };

  transferJumper = (event) => {
    let token = window.sessionStorage.getItem('token');
    let selectedJumpers = [];
    this.jumpers.forEach((jumper) => {
      if (jumper.checked) {
        selectedJumpers.push({
          activeStatus: jumper.activeStatus,
          baseId: jumper.baseId,
          id: jumper.id,
          lastDayOff: this.selectedDate + 'T00:00:00',
          name: jumper.lastName + ', ' + jumper.firstName
        });
      }
    });
    axios
      .post(
        environment.API_URL +
          '/jumpers/update/lastdayoff?baseId=' +
          this.selectedBase.baseId,
        selectedJumpers,
        {
          headers: { Authorization: 'Bearer ' + token }
        }
      )
      .then((response) => {
        this.toast.show('Updated Last Day Off', 'success');
        this.selectedBase = { name: '', value: '', baseId: '' };
        this.selectedDate = null;
        this.refreshJumpers();
      })
      .catch((error) => {
        this.toast.show('Unable to Update Last Day Off', 'error');
        console.dir(error);
      });
  };
}
