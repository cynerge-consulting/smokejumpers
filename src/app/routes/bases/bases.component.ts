import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { environment } from '../../../environments/environment';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-bases',
  templateUrl: './bases.component.html',
  styleUrls: ['./bases.component.scss']
})
export class BasesComponent implements OnInit {
  userBase;
  bases = [];
  headings = [
    {
      label: 'Base Name',
      key: 'name'
    },
    {
      label: 'Code',
      key: 'code'
    },
    {
      label: 'Active',
      key: 'active'
    }
  ];
  settings = {
    label: 'New Base',
    action: 'create',
    route: 'bases',
    target: 'bases'
  };

  constructor(private toast: ToastService) {}

  async ngOnInit() {
    let token = window.sessionStorage.getItem('token');
    let userInfo = JSON.parse(window.sessionStorage.getItem('userInfo'));
    this.userBase = userInfo.basecode;
    let baseCode = userInfo.basecode;
    let bases = await axios.get(
      environment.API_URL + '/base/?type=spike&baseCode=' + baseCode,
      {
        headers: { Authorization: 'Bearer ' + token }
      }
    );
    this.bases = bases.data.value;
    this.bases.forEach((base) => {
      if (base.deleted) {
        base.active = 'No';
      } else {
        base.active = 'Yes';
      }
    });
  }

  delete = async (row) => {
    let token = window.sessionStorage.getItem('token');
    let id = '';
    if (row.id) {
      id = row.id;
    } else if (row.href) {
      id = row.href.slice(row.href.lastIndexOf('/') + 1, row.href.length);
    }
    let deleted = await axios
      .delete(environment.API_URL + '/base/' + id + '/delete', {
        headers: { Authorization: 'Bearer ' + token }
      })
      .then((response) => {
        this.toast.show('Success deleting base', 'success');
      })
      .catch((error) => {
        this.toast.show('Error deleting base', 'error');
      });
  };
}
