import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import axios from 'axios';
import { environment } from '../../../../environments/environment';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'app-new-jumper',
  templateUrl: './new-jumper.component.html',
  styleUrls: [
    './new-jumper.component.scss',
    '../../../components/form/form.component.scss'
  ]
})
export class NewJumperComponent implements OnInit {
  mode = 'Create';

  // define base jumper object
  jumper = {
    id: '',
    baseId: 11
  };

  // endpoint vars
  qualifications = [];
  traineeQualifications = [];

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
              value: 'PFT'
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
              value: 'TEMP'
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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toast: ToastService
  ) {}

  async ngOnInit() {
    let token = window.sessionStorage.getItem('token');

    // get endpoint data for form options
    let qualifications = await axios.get(environment.API_URL + '/Quals', {
      headers: { Authorization: 'Bearer ' + token }
    });
    qualifications.data.value.forEach((qual) => {
      let q = qual;
      let tq = qual;
      q.type = 'Q';
      tq.type = 'T';
      this.qualifications.push({
        acronym: qual.Acronym,
        type: 'Q',
        name: qual.title + ' | ' + qual.Acronym,
        id: qual.id,
        title: qual.title,
        value: qual.value,
        checked: false
      });
      this.traineeQualifications.push({
        acronym: qual.Acronym,
        type: 'T',
        name: qual.title + ' | ' + qual.Acronym,
        id: qual.id,
        title: qual.title,
        value: qual.value,
        checked: false
      });
    });

    // if we see an '/:id' instead of '/new' in the URL,
    // we are in "update" mode instead of "create" mode
    let url = window.location.href;
    let id = url.slice(url.lastIndexOf('/') + 1, url.length);
    if (id !== 'new') {
      this.mode = 'Update';
      let jumper = await axios.get(environment.API_URL + '/jumpers/' + id, {
        headers: { Authorization: 'Bearer ' + token }
      });
      this.jumper = jumper.data;

      // get any qualifications associated with the jumper
      let jumperQualifications = await axios.get(
        environment.API_URL + '/JumpersQuals?jumperId=' + id,
        {
          headers: { Authorization: 'Bearer ' + token }
        }
      );

      // check off checkboxes that we have jumperquals for
      let jumperQuals = jumperQualifications.data.value;
      if (!jumperQuals) {
        jumperQuals = [];
      }
      jumperQuals.forEach((jumperQual) => {
        if (jumperQual.type === 'Q') {
          this.qualifications.filter((q) => {
            if (q.id === jumperQual.qualsId) {
              q.checked = true;
            }
          });
        } else if (jumperQual.type === 'T') {
          this.traineeQualifications.filter((tq) => {
            if (tq.id === jumperQual.qualsId) {
              tq.checked = true;
            }
          });
        }
      });
    }

    // populate dropdown options according to formData.sections
    this.sections.forEach((section) => {
      section.data.forEach((datum) => {
        if (datum.dropdown) {
          if (this.jumper[datum.key]) {
            let choice = datum.options.filter((option) => {
              let optString = option.value;
              let dataString = this.jumper[datum.key];
              return optString.toString() === dataString.toString();
            });
            if (choice.length) {
              datum.choice = choice[0];
            }
          }
        }
      });
    });
  }

  // dropdown handler
  onSelectedDropdownItem = (event, datum) => {
    this.jumper[datum.key] = event.value;
  };

  submitJumperQuals = (id) => {
    let token = window.sessionStorage.getItem('token');
    const options = {
      headers: { Authorization: 'Bearer ' + token }
    };
    let url = environment.API_URL + '/JumpersQuals/' + id + '/add';

    let quals = [];

    // see which qualifications are checked
    this.traineeQualifications.forEach((qual) => {
      if (qual.checked) {
        quals.push({ id: qual.id, type: qual.type });
      }
    });
    this.qualifications.forEach((qual) => {
      if (qual.checked) {
        quals.push({ id: qual.id, type: qual.type });
      }
    });

    axios
      .post(url, quals, options)
      .then((response) => {
        this.toast.show(
          'Jumper was ' + (this.mode === 'Create' ? 'creat' : 'updat') + 'ed',
          'success'
        );
        this.router.navigate(['/jumpers']);
      })
      .catch((error) => {
        console.dir(error);
      });
  };

  submitForm = (data) => {
    let token = window.sessionStorage.getItem('token');
    const options = {
      headers: { Authorization: 'Bearer ' + token }
    };
    let url = environment.API_URL + '/jumpers/add';

    if (this.mode === 'Create') {
      delete this.jumper.id;
      axios
        .post(url, this.jumper, options)
        .then((response) => {
          let id = response.data;
          this.submitJumperQuals(id);
        })
        .catch((error) => {
          this.toast.show('Error creating Jumper.', 'error');
          console.dir(error);
        });
    } else if (this.mode === 'Update') {
      url = environment.API_URL + '/jumpers' + '/' + this.jumper.id + '/update';
      axios
        .post(url, this.jumper, options)
        .then((response) => {
          this.submitJumperQuals(this.jumper.id);
        })
        .catch((error) => {
          this.toast.show('Error updating Jumper.', 'error');
          console.dir(error);
        });
    }
  };
}
