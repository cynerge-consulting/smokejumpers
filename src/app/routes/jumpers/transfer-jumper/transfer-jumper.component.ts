import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { environment } from '../../../../environments/environment';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'app-transfer-jumper',
  templateUrl: './transfer-jumper.component.html',
  styleUrls: [
    './transfer-jumper.component.scss',
    '../../../components/form/form.component.scss'
  ]
})
export class TransferJumperComponent implements OnInit {
  baseCode;
  baseId;
  jumpers;
  originalJumpers;
  selectedJumper = {
    name: '',
    id: ''
  };
  bases;
  selectedBase = {
    value: '',
    baseId: ''
  };
  buttonText = 'Transfer Jumper';

  constructor(private toast: ToastService) {}

  ngOnInit(): void {
    let token = window.sessionStorage.getItem('token');
    axios
      .get(environment.API_URL + '/jumpers', {
        headers: { Authorization: 'Bearer ' + token }
      })
      .then((response) => {
        this.jumpers = response.data.value;
        this.jumpers.forEach((jumper) => {
          jumper.name =
            jumper.firstName + ' ' + jumper.lastName + ' | ' + jumper.base.code;
        });
        this.originalJumpers = this.jumpers;
      })
      .catch((error) => {
        console.dir(error);
      });
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

    let userInfo = JSON.parse(window.sessionStorage.getItem('userInfo'));
    if (userInfo) {
      this.baseCode = userInfo.basecode;
      this.baseId = userInfo.baseId;
    } else {
      this.baseCode = 'BOI';
      this.baseId = 11;
    }
    this.buttonText = 'Transfer Jumper to ' + this.baseCode;
  }

  selectJumper = (jumper) => {
    this.selectedJumper = jumper;
    this.bases.forEach((base) => {
      if (jumper.baseId === base.baseId) {
        this.selectedBase = base;
      }
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

  transferJumper = (event) => {
    let token = window.sessionStorage.getItem('token');
    axios
      .get(
        environment.API_URL +
          '/jumpers/transfer/?baseCode=' +
          this.baseCode +
          '&baseId=' +
          this.baseId +
          '&jumperId=' +
          this.selectedJumper.id,
        {
          headers: { Authorization: 'Bearer ' + token }
        }
      )
      .then((response) => {
        this.toast.show(response.data, 'success');
        axios
          .get(environment.API_URL + '/jumpers', {
            headers: { Authorization: 'Bearer ' + token }
          })
          .then((response) => {
            this.jumpers = response.data.value;
            this.jumpers.forEach((jumper) => {
              jumper.name =
                jumper.firstName +
                ' ' +
                jumper.lastName +
                ' | ' +
                jumper.base.code;
            });
            this.originalJumpers = this.jumpers;
            this.selectJumper({ name: '', text: '' });
          })
          .catch((error) => {
            console.dir(error);
          });
      })
      .catch((error) => {
        this.toast.show('Unable to Transfer Jumper', 'error');
        console.dir(error);
      });
  };
}
