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
      label: 'Qualification',
      key: 'Acronym'
    },
    {
      label: 'Title',
      key: 'title'
    },
    {
      label: 'Active',
      key: 'active'
    }
  ];
  settings = {
    label: 'New Qualification',
    action: 'create',
    target: 'qualifications',
    route: 'qualifications'
  };

  constructor(private toast: ToastService) {}

  async ngOnInit() {
    this.refreshQualifications();
  }

  refreshQualifications = async () => {
    let token = window.sessionStorage.getItem('token');
    let qualifications = await axios.get(environment.API_URL + '/Quals', {
      headers: { Authorization: 'Bearer ' + token }
    });
    this.qualifications = qualifications.data.value;
  };

  delete = async (qualification) => {
    let token = window.sessionStorage.getItem('token');
    let userInfo = JSON.parse(window.sessionStorage.getItem('userInfo'));
    let userId = 111;
    if (userInfo) {
      userId = userInfo.id;
    }
    let id = '';
    if (qualification.id) {
      id = qualification.id;
    } else if (qualification.href) {
      id = qualification.href.slice(
        qualification.href.indexOf('/Quals/') + '/Quals/'.length,
        qualification.href.length
      );
    }
    axios
      .delete(
        environment.API_URL + '/Quals/' + id + '/delete?userId=' + userId,
        {
          headers: { Authorization: 'Bearer ' + token }
        }
      )
      .then((response) => {
        this.toast.show('Deleted Qualification', 'success');
        this.refreshQualifications();
      })
      .catch((error) => {
        this.toast.show('Error deleting Incident', 'error');
      });
  };
}
