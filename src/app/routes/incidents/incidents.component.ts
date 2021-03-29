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
  incidents = [];
  modal = {
    active: false,
    data: {}
  };

  headings = [
    {
      label: 'Incident',
      key: '_mission'
    },
    {
      label: 'Type',
      key: '_mode'
    },
    {
      label: 'Name',
      key: '_nameofIncident'
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
  year;

  constructor(
    private route: ActivatedRoute,
    private toast: ToastService,
    private router: Router
  ) {
    this.route.params.subscribe((params) => {
      this.year = params.year;
    });
  }

  ngOnInit() {
    let token = window.sessionStorage.getItem('token');
    axios
      .get(environment.API_URL + '/incidents', {
        headers: { Authorization: 'Bearer ' + token }
      })
      .then((response) => {
        this.incidents = response.data.value;
      })
      .catch((error) => {
        console.dir(error);
        this.toast.show('Unable to retreive incidents.', 'error');
      });
    this.toast.show('Example toast', 'warning');
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
    let id = '';
    if (incident.id) {
      id = incident.id;
    } else if (incident.href) {
      id = incident.href.replace(
        'http://dev.wrk.fs.usda.gov/masteraction/services/api/incidents/',
        ''
      );
    }
    let deleted = await axios
      .delete(environment.API_URL + '/incidents/' + id, {
        headers: { Authorization: 'Bearer ' + token }
      })
      .then((response) => {
        this.toast.show('Deleted Incident', 'success');
      })
      .catch((error) => {
        this.toast.show('Error deleting Incident', 'error');
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
}
