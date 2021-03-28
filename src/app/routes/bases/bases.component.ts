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
  bases = [];
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
  settings = [
    {
      label: 'New Base',
      action: 'create',
      target: 'bases'
    }
  ];

  constructor(private toast: ToastService) {}

  async ngOnInit() {
    let token = window.sessionStorage.getItem('token');
    let bases = await axios.get(environment.API_URL + '/base/dropdown/main', {
      headers: { Authorization: 'Bearer ' + token }
    });
    this.bases = bases.data;
  }

  delete = async (row) => {
    let token = window.sessionStorage.getItem('token');
    let id = '';
    if (row.id) {
      id = row.id;
    } else if (row.href) {
      id = row.href.replace(
        'http://dev.wrk.fs.usda.gov/masteraction/services/api/base/',
        ''
      );
    }
    let deleted = await axios
      .delete(environment.API_URL + '/base/' + id, {
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
