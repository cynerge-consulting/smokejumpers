import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  bases;
  selectedBase = {
    value: '',
    name: '',
    baseId: ''
  };

  constructor(private router: Router, private toast: ToastService) {}

  ngOnInit(): void {
    this.getBases();
  }

  getBases = () => {
    let token = window.sessionStorage.getItem('token');
    axios
      .get(environment.API_URL + '/base/dropdown/main', {
        headers: { Authorization: 'Bearer ' + token }
      })
      .then((response) => {
        this.bases = response.data;
      });
  };

  register = () => {
    let token = window.sessionStorage.getItem('token');
    axios
      .get(
        environment.AUTH_URL + '/register?baseId=' + this.selectedBase.baseId,
        {
          headers: { Authorization: 'Bearer ' + token }
        }
      )
      .then((response) => {
        this.toast.show('Successfully Registered', 'success');
        this.router.navigate(['welcome']);
      })
      .catch((error) => {
        this.toast.show('Unable to Register', 'error');
      });
  };

  selectBase = (base) => {
    this.selectedBase = base;
  };
}
