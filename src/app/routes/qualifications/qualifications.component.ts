import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { environment } from '../../../environments/environment';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-qualifications',
  templateUrl: './qualifications.component.html',
  styleUrls: ['./qualifications.component.scss']
})
export class QualificationsComponent implements OnInit {
  qualifications = [];
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
    target: 'qualifications',
    route: 'qualifications'
  };

  constructor(private toast: ToastService) {}

  async ngOnInit() {
    let token = window.sessionStorage.getItem('token');
    let qualifications = await axios.get(environment.API_URL + '/Quals', {
      headers: { Authorization: 'Bearer ' + token }
    });
    this.qualifications = qualifications.data;
  }

  delete = async (row) => {
    let token = window.sessionStorage.getItem('token');
    let id = '';
    if (row.id) {
      id = row.id;
    } else if (row.href) {
      id = row.href.replace(
        'http://dev.wrk.fs.usda.gov/masteraction/services/api/Quals/',
        ''
      );
    }
    let deleted = await axios
      .delete(environment.API_URL + '/Quals/' + id, {
        headers: { Authorization: 'Bearer ' + token }
      })
      .then((response) => {
        this.toast.show('Success deleting qualification', 'success');
      })
      .catch((error) => {
        this.toast.show('Error deleting qualification', 'error');
      });
  };
}
