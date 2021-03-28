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
  settings = {
    label: 'New Chute',
    action: 'create',
    target: 'pilots',
    route: 'pilots'
  };

  constructor(private toast: ToastService) {}

  ngOnInit() {
    // check session storage for a token
    let token = window.sessionStorage.getItem('token');
    axios
      .get(environment.API_URL + '/pilots', {
        headers: { Authorization: 'Bearer ' + token }
      })
      .then((response) => {
        this.pilots = response.data;
      })
      .catch((error) => {
        this.toast.show('Unable to retreive pilots list.', 'error');
      });
  }

  delete = async (row) => {
    let token = window.sessionStorage.getItem('token');
    let id = '';
    if (row.id) {
      id = row.id;
    } else if (row.href) {
      id = row.href.replace(
        'http://dev.wrk.fs.usda.gov/masteraction/services/api/pilots/',
        ''
      );
    }
    let deleted = await axios
      .delete(environment.API_URL + '/pilots/' + id, {
        headers: { Authorization: 'Bearer ' + token }
      })
      .then((response) => {
        this.toast.show('Success deleting pilot', 'success');
      })
      .catch((error) => {
        this.toast.show('Error deleting pilot', 'error');
      });
  };
}
