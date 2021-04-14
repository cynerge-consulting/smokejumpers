import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import axios from 'axios';
import { environment } from '../../../environments/environment';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-incidents',
  templateUrl: './incidents.component.html',
  styleUrls: ['./incidents.component.scss']
})
export class IncidentsComponent implements OnInit {
  isAdmin = false;
  incidents = [];
  selectedBase = {
    baseCode: '',
    value: ''
  };
  bases;
  modal = {
    active: false,
    data: {}
  };

  headings = [
    {
      label: 'Name',
      key: '_nameofIncident'
    },
    {
      label: 'Mode',
      key: '_mode'
    },
    {
      label: 'Mission',
      key: '_mission'
    },
    {
      label: 'Date',
      key: '_incidentDate'
    }
  ];
  settings = {
    name: 'Incident',
    route: 'incidents',
    menuItems: [
      {
        label: 'New Incident',
        action: 'new',
        route: 'incidents/new'
      },
      {
        label: 'Edit Incident',
        action: 'edit',
        route: 'incidents/'
      },
      {
        label: 'Delete Incident',
        action: 'delete',
        route: 'incidents/'
      }
    ]
  };
  archived = false;

  constructor(
    private route: ActivatedRoute,
    private toast: ToastService,
    private router: Router
  ) {
    this.route.params.subscribe((params) => {
      this.archived = params.archived;
      this.refreshIncidents()
    });
  }

  ngOnInit() {
    let userInfo = JSON.parse(window.sessionStorage.getItem('userInfo'));
    if (userInfo) {
      this.selectedBase.baseCode = userInfo.basecode
      this.selectedBase.value = userInfo.basecode
      if (userInfo.role === 'baseadmin') {
        this.isAdmin = true
      }
    }
    this.getBases();
    this.refreshIncidents();
  }

  getBases = () => {
    let token = window.sessionStorage.getItem('token');
    axios.get(environment.API_URL + '/base/dropdown/main', {
      headers: { Authorization: 'Bearer ' + token }
    }).then((response) => {
      this.bases = response.data
    });
  }

  confirmDeleteIncident = (incident) => {
    this.modal = {
      data: {
        content: 'Are you sure you want to delete this incident?',
        deny: 'Cancel',
        confirm: 'Delete',
        action: 'delete',
        incident: incident
      },
      active: true
    };
  };

  deleteIncident = async (incident) => {
    let token = window.sessionStorage.getItem('token');
    let userInfo = JSON.parse(window.sessionStorage.getItem('userInfo'))
    let userId;
    if (userInfo) {
      userId = userInfo.id
    } else {
      userId = 111;
    }
    let id = '';
    if (incident.id) {
      id = incident.id;
    } else if (incident.href) {
      id = incident.href.slice(
        incident.href.indexOf('/incidents/') + '/incidents/'.length,
        incident.href.length
      );
    }
    axios
      .delete(
        environment.API_URL + '/incidents/' + id + '/delete?userId=' + userId,
        {
          headers: { Authorization: 'Bearer ' + token }
        }
      )
      .then((response) => {
        this.toast.show('Deleted Incident', 'success');
        this.refreshIncidents();
      })
      .catch((error) => {
        this.toast.show('Error deleting Incident', 'error');
      });
  };

  refreshIncidents = async () => {
    let token = window.sessionStorage.getItem('token');
    let baseCode = this.selectedBase.baseCode
    let incidents;
    if (!this.archived) {
      try {
        incidents = await axios.get(environment.API_URL + '/incidents?baseCode=' + baseCode, {
          headers: { Authorization: 'Bearer ' + token }
        });
      } catch (error) {
        console.dir(error);
        this.toast.show('Unable to retreive incidents.', 'error');
      }
    } else {
      try {
        incidents = await axios.get(
          environment.API_URL + '/incidents/?baseCode=' + baseCode + '&archived=true',
          {
            headers: { Authorization: 'Bearer ' + token }
          }
        );
      } catch (error) {
        console.dir(error);
        this.toast.show('Unable to retreive incidents.', 'error');
      }
    }

    this.incidents = incidents.data.value;

    // default sort by descending by date
    this.incidents.sort((a, b) => {
      var keyA = a._incidentDate;
      var keyB = b._incidentDate;
      if (keyA < keyB) {
        return 1;
      }
      if (keyA > keyB) {
        return -1;
      }
      return 0;
    });
  };

  modalConfirmed = (data) => {
    if (data.action === 'delete') {
      this.deleteIncident(data.incident);
    }
    this.modal.active = false;
  };
  modalDenied = (data) => {
    this.modal.active = false;
  };

  selectBase = (base) => {
    this.selectedBase = base
    this.refreshIncidents()
  }
}
