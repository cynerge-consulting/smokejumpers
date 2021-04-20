import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import axios from 'axios';
import { environment } from '../../../../environments/environment';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'app-new-pilot',
  templateUrl: './new-pilot.component.html',
  styleUrls: [
    './new-pilot.component.scss',
    '../../../components/form/form.component.scss'
  ]
})
export class NewPilotComponent implements OnInit {
  mode = 'Create';
  pilot = {
    id: '',
    baseCode: 'BOI',
    baseId: 11,
    active: false,
    affiliation: ''
  };
  selectedAffiliation = {
    name: '',
    value: ''
  };
  selectedActive = {
    name: '',
    value: ''
  };

  // define form sections
  sections = [
    {
      title: 'Pilot Information',
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
          choice: {},
          dropdown: true,
          label: 'Affiliations',
          key: 'affiliation',
          options: [
            {
              name: 'Contract',
              value: 'Contract'
            },
            {
              name: 'Agency',
              value: 'Agency'
            }
          ]
        },
        {
          choice: {},
          dropdown: true,
          label: 'Active',
          key: 'active',
          options: [
            {
              name: 'Yes',
              value: true
            },
            {
              name: 'No',
              value: false
            }
          ]
        }
      ]
    }
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toast: ToastService
  ) {}

  async ngOnInit() {
    let token = window.sessionStorage.getItem('token');
    let url = window.location.href;
    let id = url.slice(url.lastIndexOf('/') + 1, url.length);
    if (id.includes(';')) {
      id = url.slice(url.lastIndexOf('/') + 1, url.indexOf(';'));
    }
    if (id !== 'new') {
      this.mode = 'Update';
      let pilot = await axios.get(environment.API_URL + '/pilots/' + id, {
        headers: { Authorization: 'Bearer ' + token }
      });
      this.pilot = pilot.data;
      this.pilot.id = id;

      // populate dropdown options according to formData.sections
      this.sections.forEach((section) => {
        section.data.forEach((datum) => {
          if (datum.dropdown) {
            datum.options.forEach((option) => {
              if (this.pilot[datum.key] === option.value) {
                datum.choice = option;
                if (datum.key === 'affiliation') {
                  this.selectedAffiliation = option;
                }
                if (datum.key === 'active') {
                  this.selectedActive = option;
                }
              }
            });
          }
        });
      });
    }
  }

  selectAffiliation = (event) => {
    this.selectedAffiliation = event;
    this.pilot.affiliation = event.value;
  };
  selectActive = (event) => {
    this.selectedActive = event;
    this.pilot.active = event.value;
  };

  submitForm = (data) => {
    let token = window.sessionStorage.getItem('token');
    const options = {
      headers: { Authorization: 'Bearer ' + token }
    };
    let url = environment.API_URL + '/pilots/add';

    if (this.mode === 'Create') {
      axios
        .post(url, this.pilot, options)
        .then((response) => {
          // pop success toast and redirect to list
          this.toast.show('Pilot created.', 'success');
          this.router.navigate(['/pilots']);
        })
        .catch((error) => {
          this.toast.show('Error creating Pilot', 'error');
          console.dir(error);
        });
    } else if (this.mode === 'Update') {
      url = environment.API_URL + '/pilots' + '/' + this.pilot.id + '/update';
      axios
        .post(url, this.pilot, options)
        .then((response) => {
          // pop success toast and redirect to list
          this.toast.show('Pilot updated.', 'success');
          this.router.navigate(['/pilots']);
        })
        .catch((error) => {
          this.toast.show('Error Updating Pilot', 'error');
          console.dir(error);
        });
    }
  };
}
