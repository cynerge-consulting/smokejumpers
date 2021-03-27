import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import axios from 'axios';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-new-jumper',
  templateUrl: './new-jumper.component.html',
  styleUrls: ['./new-jumper.component.scss']
})
export class NewJumperComponent implements OnInit {
  mode = 'Create';
  // define jumper object
  jumper = {
    id: ''
  };

  // define form sections
  sections = [
    {
      title: 'Jumper Information',
      data: [
        {
          input: true,
          placeholder: 'First Name',
          key: 'firstName'
        },
        {
          input: true,
          placeholder: 'Last Name',
          key: 'lastName'
        },
        {
          input: true,
          placeholder: 'Phone Number',
          key: 'phoneNumber'
        },
        {
          input: true,
          placeholder: 'Grade',
          key: 'grade'
        },
        {
          choice: {},
          dropdown: true,
          label: 'Tour',
          key: 'tour',
          options: [
            {
              name: 'PFT',
              value: 'pft'
            },
            {
              name: '18/8',
              value: '18/8'
            },
            {
              name: '13/13',
              value: '13/13'
            },
            {
              name: 'Temp',
              value: 'temp'
            }
          ]
        },
        {
          input: true,
          type: 'date',
          key: 'lastDayOff',
          placeholder: 'Last Day Off'
        },
        {
          input: true,
          key: 'weight',
          placeholder: 'Jumper Weight'
        },
        {
          choice: {},
          dropdown: true,
          label: 'Base Position',
          key: 'basePosition',
          options: [
            {
              name: 'Assistant Foreman',
              value: 'Assistant Foreman'
            },
            {
              name: 'Base Manager',
              value: 'Base Manager'
            },
            {
              name: 'Crewmember',
              value: 'Crewmember'
            },
            {
              name: 'Foreman',
              value: 'Foreman'
            },
            {
              name: 'Spotter',
              value: 'Spotter'
            },
            {
              name: 'Squadleader',
              value: 'Squadleader'
            }
          ]
        },
        {
          choice: {},
          dropdown: true,
          label: 'Spotter',
          key: 'spotter',
          options: [
            {
              name: 'Spotter',
              value: 'Spotter'
            },
            {
              name: 'Trainee',
              value: 'Trainee'
            }
          ]
        },
        {
          choice: {},
          dropdown: true,
          label: 'First Aid',
          key: 'firstAid',
          options: [
            {
              name: 'Advanced First Aid',
              value: 'Advanced First Aid'
            },
            {
              name: 'EMT',
              value: 'EMT'
            },
            {
              name: 'OEC',
              value: 'OEC'
            },
            {
              name: 'Paramedic',
              value: 'Paramedic'
            },
            {
              name: 'Wilderness First Aid',
              value: 'Wilderness First Aid'
            }
          ]
        },
        {
          choice: {},
          dropdown: true,
          label: 'Rigger',
          key: 'rigger',
          options: [
            {
              name: 'Master Rigger',
              value: 'Master Rigger'
            },
            {
              name: 'Senior Rigger',
              value: 'Senior Rigger'
            },
            {
              name: 'Trainee',
              value: 'Trainee'
            }
          ]
        }
      ]
    }
  ];

  constructor(private route: ActivatedRoute, private router: Router) {
    this.route.params.subscribe((params) => {
      for (const key in params) {
        if (params.hasOwnProperty(key)) {
          this.mode = 'Update';
          this.jumper[key] = params[key];
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
    let url = environment.API_URL + '/jumpers';

    if (this.mode === 'Create') {
      axios
        .post(url, this.jumper, options)
        .then((response) => {
          // pop success toast and redirect to chutes list
          this.router.navigate(['/jumpers']);
        })
        .catch((error) => {
          console.dir(error);
        });
    } else if (this.mode === 'Update') {
      url = environment.API_URL + '/jumpers' + '/' + this.jumper.id;
      axios
        .put(url, this.jumper, options)
        .then((response) => {
          // pop success toast and redirect to chutes list
          this.router.navigate(['/jumpers']);
        })
        .catch((error) => {
          console.dir(error);
        });
    }
  };
}
