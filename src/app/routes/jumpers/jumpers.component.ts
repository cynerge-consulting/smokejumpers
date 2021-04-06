import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { environment } from '../../../environments/environment';
import { ToastService } from '../../services/toast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-jumpers',
  templateUrl: './jumpers.component.html',
  styleUrls: ['./jumpers.component.scss']
})
export class JumpersComponent implements OnInit {
  jumpers = [];
  headings = [
    {
      label: 'First Name',
      key: 'firstName'
    },
    {
      label: 'Last Name',
      key: 'lastName'
    },
    {
      label: 'Grade',
      key: 'grade'
    },
    {
      label: 'Position',
      key: 'basePosition'
    }
  ];
  settings = {
    route: 'jumpers',
    label: 'New Jumper',
    action: 'create',
    target: 'jumper'
  };

  constructor(private toast: ToastService, private router: Router) {}

  ngOnInit() {
    this.refreshJumpers();
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
      .delete(environment.API_URL + '/jumpers/' + id + '/delete', {
        headers: { Authorization: 'Bearer ' + token }
      })
      .then((response) => {
        this.toast.show('Deleted Jumper', 'success');
        this.refreshJumpers();
      })
      .catch((error) => {
        this.toast.show('Error deleting jumper', 'error');
      });
  };

  refreshJumpers = () => {
    // check session storage for a token
    let token = window.sessionStorage.getItem('token');
    axios
      .get(environment.API_URL + '/jumpers', {
        headers: { Authorization: 'Bearer ' + token }
      })
      .then((response) => {
        this.jumpers = response.data.value;
      })
      .catch((error) => {
        this.toast.show('Unable to retreive jumpers list.', 'error');
      });
  };
}
