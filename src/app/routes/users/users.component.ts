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
  role = 'sysadmin';
  query;
  searching = true;
  hasBeenFiltered = false;
  originalUsers = [];
  bases = [];
  usersWithRoleChange = [];
  usersWithBaseChange = [];
  usersWithActiveChange = [];
  users = [];
  headings = [
    {
      label: 'Name',
      key: 'firstname'
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

  async ngOnInit() {
    let userInfo = JSON.parse(window.sessionStorage.getItem('userInfo'));
    if (userInfo) {
      this.role = userInfo.role;
    }
    let token = window.sessionStorage.getItem('token');
    let bases = await axios.get(environment.API_URL + '/base/dropdown/main', {
      headers: { Authorization: 'Bearer ' + token }
    });
    this.bases = bases.data;
    this.bases.forEach((base) => {
      base.name = base.baseCode;
      base.value = base.baseId;
      base.userBaseCode = base.baseCode;
    });
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

  onKey = (event) => {
    if (!this.searching) {
      this.query = null;
      return;
    }
    // always filter against the original set of options
    if (!this.hasBeenFiltered) {
      this.hasBeenFiltered = true;
      this.originalUsers = this.users;
    }
    this.users = this.originalUsers;

    // find users that match query
    let filteredUsers = [];
    this.users.forEach((user) => {
      let name = user.firstname.toString().toLowerCase() + ' ' + user.lastname.toString().toLowerCase();
      if (name.includes(this.query.toLowerCase())) {
        filteredUsers.push(user);
      }
    });

    // dedupe users
    let uniqueUsers = [...new Set(filteredUsers)];
    this.users = uniqueUsers;
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
        this.users = response.data;
      })
      .catch((error) => {
        this.toast.show('Unable to retreive users list.', 'error');
      });
  };

  selectActive = (user) => {
    this.usersWithActiveChange.push(user);
  };

  selectRole = (role, user) => {
    user.role = role.value;
    this.usersWithRoleChange.push(user);
  };

  selectBase = (base, user) => {
    user.userBaseCode = base.userBaseCode
    user.basecode = base.name;
    user.baseId = base.value;
    this.usersWithBaseChange.push(user);
  };

  updateUsers = () => {
    this.usersWithBaseChange.forEach(async (user) => {
      await this.changeUserBase(user);
    });
    this.usersWithActiveChange.forEach(async (user) => {
      await this.changeUserActive(user);
    });
    this.usersWithRoleChange.forEach(async (user) => {
      await this.changeUserRole(user);
    });
    this.refreshUsers();
  };

  changeUserBase = async (user) => {
    let token = window.sessionStorage.getItem('token');
    let url =
      environment.AUTH_URL +
      '/setUserBase?baseCode=' +
      user.basecode +
      '&id=' +
      user.id.toString() +
      '&baseId=' +
      user.baseId;

    try {
      let updatedUser = await axios.get(url, {
        headers: { Authorization: 'Bearer ' + token }
      });
      this.toast.show('Updated User Base', 'success');
    } catch (error) {
      this.toast.show('Unable to Update User Base', 'error');
    }
  };

  changeUserActive = async (user) => {
    let token = window.sessionStorage.getItem('token');
    let url =
      environment.AUTH_URL +
      (user.active ? '/' : '/de') +
      'activateUser?' +
      'id=' +
      user.id.toString();

    try {
      let updatedUser = await axios.get(url, {
        headers: { Authorization: 'Bearer ' + token }
      });
      this.toast.show('Updated User Active Status', 'success');
    } catch (error) {
      this.toast.show('Unable to Update User Active Status', 'error');
    }
  };

  changeUserRole = async (user) => {
    let token = window.sessionStorage.getItem('token');
    let url =
      environment.AUTH_URL +
      '/setAdminRole?role=' +
      user.role +
      '&id=' +
      user.id.toString();

    try {
      let updatedUser = await axios.get(url, {
        headers: { Authorization: 'Bearer ' + token }
      });
      this.toast.show('Updated User Role', 'success');
    } catch (error) {
      this.toast.show('Unable to Update User Role', 'error');
    }
  };
}
