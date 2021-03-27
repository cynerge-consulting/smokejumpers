import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import axios from 'axios';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-new-aircraft',
  templateUrl: './new-aircraft.component.html',
  styleUrls: ['./new-aircraft.component.scss']
})
export class NewAircraftComponent implements OnInit {
  mode = 'Create';
  // define aircraft object
  aircraft = {
    id: ''
  };

  // define form sections
  sections = [
    {
      title: 'Aircraft',
      data: [
        {
          input: true,
          placeholder: 'Name',
          key: 'text'
        },
        {
          input: true,
          placeholder: 'Value',
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
          this.aircraft[key] = params[key];
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
    let url = environment.API_URL + '/travelmodes';

    if (this.mode === 'Create') {
      axios
        .post(url, this.aircraft, options)
        .then((response) => {
          // pop success toast and redirect to chutes list
          this.router.navigate(['/aircraft']);
        })
        .catch((error) => {
          console.dir(error);
        });
    } else if (this.mode === 'Update') {
      url = environment.API_URL + '/travelmodes' + '/' + this.aircraft.id;
      axios
        .put(url, this.aircraft, options)
        .then((response) => {
          // pop success toast and redirect to chutes list
          this.router.navigate(['/aircraft']);
        })
        .catch((error) => {
          console.dir(error);
        });
    }
  };
}
