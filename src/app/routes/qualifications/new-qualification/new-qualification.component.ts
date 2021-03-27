import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import axios from 'axios';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-new-qualification',
  templateUrl: './new-qualification.component.html',
  styleUrls: ['./new-qualification.component.scss']
})
export class NewQualificationComponent implements OnInit {
  mode = 'Create';
  // define qualification object
  qualification = {
    id: ''
  };

  // define form sections
  sections = [
    {
      title: 'Qualification Information',
      data: [
        {
          input: true,
          placeholder: 'Name',
          key: 'text'
        },
        {
          input: true,
          placeholder: 'Acronym',
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
          this.qualification[key] = params[key];
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
    let url = environment.API_URL + '/qualification';

    if (this.mode === 'Create') {
      axios
        .post(url, this.qualification, options)
        .then((response) => {
          // pop success toast and redirect to list
          this.router.navigate(['/qualifications']);
        })
        .catch((error) => {
          console.dir(error);
        });
    } else if (this.mode === 'Update') {
      url =
        environment.API_URL + '/qualifications' + '/' + this.qualification.id;
      axios
        .put(url, this.qualification, options)
        .then((response) => {
          // pop success toast and redirect to list
          this.router.navigate(['/qualifications']);
        })
        .catch((error) => {
          console.dir(error);
        });
    }
  };
}
