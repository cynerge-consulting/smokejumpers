import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { environment } from '../../../environments/environment';

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

  constructor() {}

  async ngOnInit() {
    // check session storage for a token
    let token = window.sessionStorage.getItem('token');
    let jumpers = await axios.get(environment.API_URL + '/jumpers', {
      headers: { Authorization: 'Bearer ' + token }
    });
    this.jumpers = jumpers.data.value;
  }
}
