import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { environment } from '../../../environments/environment';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users = [];
  headings = [
    {
      label: 'Name',
      key: 'fullName'
    },
    {
      label: 'Base',
      key: 'baseCode'
    },
    {
      label: 'Active',
      key: 'active'
    }
  ];
  settings = {
    label: 'New User',
    action: 'create',
    target: 'users',
    route: 'users'
  };

  constructor(private toast: ToastService) {}

  ngOnInit() {
    this.refreshUsers();
  }

  delete = async (user) => {
    let token = window.sessionStorage.getItem('token');
    let userInfo = JSON.parse(window.sessionStorage.getItem('userInfo'));
    let userId = 111;
    if (userInfo) {
      userId = userInfo.id;
    }
    let id = '';
    if (user.id) {
      id = user.id;
    } else if (user.href) {
      id = user.href.slice(
        user.href.indexOf('/users/') + '/users/'.length,
        user.href.length
      );
    }
    let deleted = await axios
      .delete(
        environment.API_URL + '/users/' + id + '/delete?userId=' + userId,
        {
          headers: { Authorization: 'Bearer ' + token }
        }
      )
      .then((response) => {
        this.toast.show('Deleted User', 'success');
        this.refreshUsers();
      })
      .catch((error) => {
        this.toast.show('Unable to Delete User', 'error');
      });
  };

  refreshUsers = () => {
    // check session storage for a token
    let token = window.sessionStorage.getItem('token');
    let userInfo = JSON.parse(window.sessionStorage.getItem('userInfo'));
    let baseCode = 'BOI';
    if (userInfo) {
      baseCode = userInfo.basecode;
    }
    axios
      .get(environment.AUTH_URL + '/getUserList', {
        headers: { Authorization: 'Bearer ' + token }
      })
      .then((response) => {
        this.users = response.data.value;
        this.users.forEach((user) => {
          user.name = user.firstName + ' ' + user.lastName;
        });
      })
      .catch((error) => {
        this.toast.show('Unable to retreive users list.', 'error');
      });
  };
}
