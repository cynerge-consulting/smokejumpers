import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import axios from 'axios';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-new-pilot',
  templateUrl: './new-pilot.component.html',
  styleUrls: ['./new-pilot.component.scss']
})
export class NewPilotComponent implements OnInit {
  mode = 'Create';
  // define qualification object
  pilot = {
    id: ''
  };

  // define form sections
  sections = [
    {
      title: 'Pilot Information',
      data: [
        {
          input: true,
          placeholder: 'First Name',
          key: 'text'
        },
        {
          input: true,
          placeholder: 'Last Name',
          key: 'value'
        }
      ]
    }
  ];

  constructor(private route: ActivatedRoute, private router: Router) {
    this.route.params.subscribe((params) => {
      for (const key in params) {
        if (params.hasOwnProperty(key)) {
          this.mode = 'Update';
          this.pilot[key] = params[key];
        }
      }
    });
  }

  ngOnInit(): void {}

  submitForm = (data) => {
    let token = window.sessionStorage.getItem('token');
    const options = {
      headers: { Authorization: 'Bearer ' + token }
    };
    let url = environment.API_URL + '/pilots';

    if (this.mode === 'Create') {
      axios
        .post(url, this.pilot, options)
        .then((response) => {
          // pop success toast and redirect to list
          this.router.navigate(['/pilots']);
        })
        .catch((error) => {
          console.dir(error);
        });
    } else if (this.mode === 'Update') {
      url = environment.API_URL + '/pilots' + '/' + this.pilot.id;
      axios
        .put(url, this.pilot, options)
        .then((response) => {
          // pop success toast and redirect to list
          this.router.navigate(['/pilots']);
        })
        .catch((error) => {
          console.dir(error);
        });
    }
  };
}
