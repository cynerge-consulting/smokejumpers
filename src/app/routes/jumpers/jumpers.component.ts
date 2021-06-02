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
  userBase;
  jumpers = [];
  headings = [
    {
      label: 'Name',
      key: 'name'
    },
    {
      label: 'Phone #',
      key: 'phoneNumber'
    },
    {
      label: 'Active',
      key: 'active'
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
    let userInfo = JSON.parse(window.sessionStorage.getItem('userInfo'));
    this.userBase = userInfo.basecode;
    this.refreshJumpers();
  }

  sort = (array, key) => {
    array.sort((a, b) => {
      var keyA = a[key];
      var keyB = b[key];
      if (keyA < keyB) {
        return -1;
      }
      if (keyA > keyB) {
        return 1;
      }
      return 0;
    });
    return array;
  };

  reverseSort = (array, key) => {
    array.sort((a, b) => {
      var keyA = a[key];
      var keyB = b[key];
      if (keyA < keyB) {
        return 1;
      }
      if (keyA > keyB) {
        return -1;
      }
      return 0;
    });
    return array;
  };

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
    let userInfo = JSON.parse(window.sessionStorage.getItem('userInfo'));
    let baseId = userInfo.baseId;
    axios
      .get(environment.API_URL + '/jumpers?baseId=' + baseId, {
        headers: { Authorization: 'Bearer ' + token }
      })
      .then((response) => {
        this.jumpers = response.data.value;
        this.jumpers.forEach((jumper) => {
          jumper.name = jumper.lastName + ', ' + jumper.firstName;
          jumper.active = jumper.activeStatus ? 'Yes' : 'No';
        });
        this.jumpers = this.sort(this.jumpers, 'name');
        this.jumpers = this.reverseSort(this.jumpers, 'active');
      })
      .catch((error) => {
        this.toast.show('Unable to retreive jumpers list.', 'error');
      });
  };
}
