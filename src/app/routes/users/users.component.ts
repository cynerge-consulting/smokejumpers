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
  userBase = '';
  role = 'unregistered';
  query;
  searching = true;
  updating = false;
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

  // update display vars
  step = 0;
  percent = 0;
  total = 0;

  // modal vars
  modal = {
    active: false,
    data: {}
  };

  constructor(private toast: ToastService) {}

  async ngOnInit() {
    let userInfo = JSON.parse(window.sessionStorage.getItem('userInfo'));
    this.role = userInfo.role;
    this.userBase = userInfo.baseCode;
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

  delete = (event) => {
    let user = event.user;
    let token = window.sessionStorage.getItem('token');
    axios
      .delete(environment.AUTH_URL + '/users?id=' + user.id, {
        headers: { Authorization: 'Bearer ' + token }
      })
      .then((response) => {
        this.modal.active = false;
        this.toast.show('Deleted User', 'success');
        this.refreshUsers();
      })
      .catch((error) => {
        this.modal.active = false;
        this.toast.show('Unable to Delete User', 'error');
      });
  };

  showDeleteModal = (user) => {
    this.modal = {
      data: {
        content: 'Are you sure you want to delete this user?',
        deny: 'Cancel',
        confirm: 'Delete',
        action: 'delete',
        user: user
      },
      active: true
    };
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
      let name =
        user.firstname.toString().toLowerCase() +
        ' ' +
        user.lastname.toString().toLowerCase();
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
    let baseCode = userInfo.basecode;

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
    // if this user is already queued for changes, remove it from the array and add the fresh version
    let activeUser = this.usersWithActiveChange.filter((activeUser, index) => {
      if (user.id === activeUser.id) {
        this.usersWithActiveChange.splice(index, 1);
      }
      return user.id === activeUser.id;
    });
    if (activeUser[0]) {
      this.usersWithActiveChange.push(activeUser[0]);
    } else {
      // if this user isn't already queued for changes, add them to the queue
      this.usersWithActiveChange.push(user);
    }
  };

  selectRole = (role, user) => {
    user.role = role.value;
    // if this user is already queued for changes, remove it from the array and add the fresh version
    let roleUser = this.usersWithRoleChange.filter((roleUser, index) => {
      if (user.id === roleUser.id) {
        this.usersWithRoleChange.splice(index, 1);
      }
      return user.id === roleUser.id;
    });
    if (roleUser[0]) {
      this.usersWithRoleChange.push(roleUser[0]);
    } else {
      // if this user isn't already queued for changes, add them to the queue
      this.usersWithRoleChange.push(user);
    }
  };

  selectBase = (base, user) => {
    user.userBaseCode = base.userBaseCode;
    user.basecode = base.name;
    user.baseId = base.value;
    // if this user is already queued for changes, remove it from the array and add the fresh version
    let baseUser = this.usersWithBaseChange.filter((baseUser, index) => {
      if (user.id === baseUser.id) {
        this.usersWithBaseChange.splice(index, 1);
      }
      return user.id === baseUser.id;
    });
    if (baseUser[0]) {
      this.usersWithBaseChange.push(baseUser[0]);
    } else {
      // if this user isn't already queued for changes, add them to the queue
      this.usersWithBaseChange.push(user);
    }
  };

  updateUsers = async () => {
    this.updating = true;
    let token = window.sessionStorage.getItem('token');
    try {
      let baseChanges = [];
      for (let index = 0; index < this.usersWithBaseChange.length; index++) {
        const user = this.usersWithBaseChange[index];
        let url =
          environment.AUTH_URL +
          '/setUserBase?baseCode=' +
          user.basecode +
          '&id=' +
          user.id.toString() +
          '&baseId=' +
          user.baseId;

        let updatedUser = await axios.get(url, {
          headers: { Authorization: 'Bearer ' + token }
        });
        baseChanges.push(updatedUser.data);
        this.step++;
      }

      let roleChanges = [];
      for (let index = 0; index < this.usersWithRoleChange.length; index++) {
        const user = this.usersWithRoleChange[index];
        let url =
          environment.AUTH_URL +
          '/setAdminRole?role=' +
          user.role +
          '&id=' +
          user.id.toString();

        let updatedUser = await axios.get(url, {
          headers: { Authorization: 'Bearer ' + token }
        });
        roleChanges.push(updatedUser.data);
        this.step++;
      }

      let activeChanges = [];
      for (let index = 0; index < this.usersWithActiveChange.length; index++) {
        const user = this.usersWithActiveChange[index];
        let url =
          environment.AUTH_URL +
          (user.active ? '/' : '/de') +
          'activateUser?' +
          'id=' +
          user.id.toString();

        let updatedUser = await axios.get(url, {
          headers: { Authorization: 'Bearer ' + token }
        });
        activeChanges.push(updatedUser.data);
        this.step++;
      }
      this.toast.show('Update Complete', 'success');
    } catch (error) {
      this.toast.show('Unable to perform Update', 'error');
    }
    this.updating = false;
    this.clearUpdateQueue();
    this.refreshUsers();
  };

  clearUpdateQueue = () => {
    this.usersWithBaseChange = [];
    this.usersWithRoleChange = [];
    this.usersWithActiveChange = [];
    this.step = 0;
  };

  getUpdateText = () => {
    let total =
      this.usersWithBaseChange.length +
      this.usersWithRoleChange.length +
      this.usersWithActiveChange.length;
    let percent = (this.step / total) * 100;
    this.percent = percent;
    return 'Updating... ' + percent.toFixed(0) + '%';
  };
}
