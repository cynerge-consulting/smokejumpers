import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import axios from 'axios';
import { environment } from '../../../../environments/environment';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'app-new-jumper',
  templateUrl: './new-jumper.component.html',
  styleUrls: [
    '../../incidents/new-incident/new-incident.component.scss',
    './new-jumper.component.scss',
    '../../../components/modal/modal.component.scss'
  ]
})
export class NewJumperComponent implements OnInit {
  mode = 'Create';
  userBase = '';

  // "Add Qualification" vars
  addingQualification = false;
  qualification = {
    id: '',
    edit: false,
    functionArea: '',
    show: false
  };
  qualificationSections = [
    {
      title: 'Qualification Information',
      data: [
        {
          required: true,
          input: true,
          placeholder: 'Title',
          key: 'title'
        },
        {
          required: true,
          input: true,
          maxlength: 4,
          placeholder: 'Acronym',
          key: 'Acronym'
        }
      ]
    }
  ];

  // qualification filter vars
  qualsQuery;
  tqualsQuery;
  originalQuals = [];
  originalTQuals = [];

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
          required: true,
          placeholder: 'First Name',
          key: 'firstName'
        },
        {
          choice: {},
          dropdown: true,
          label: 'Position',
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
          input: true,
          required: true,
          placeholder: 'Last Name',
          key: 'lastName'
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
          width: 25,
          required: true,
          input: true,
          placeholder: 'Phone Number',
          key: 'phoneNumber'
        },
        {
          width: 25,
          input: true,
          placeholder: 'Grade',
          key: 'grade'
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
          width: 25,
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
          width: 25,
          input: true,
          type: 'date',
          key: 'lastDayOff',
          placeholder: 'Last Day Off'
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
        },
        {
          width: 25,
          checkbox: true,
          label: 'Active Status ?',
          key: 'activeStatus'
        },
        {
          width: 25,
          checkbox: true,
          label: 'Retired ?',
          key: 'retired'
        },
        {},
        {
          input: true,
          key: 'weight',
          placeholder: 'Jumper Weight'
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
    let userInfo = JSON.parse(window.sessionStorage.getItem('userInfo'));
    this.userBase = userInfo.basecode;
    let token = window.sessionStorage.getItem('token');

    this.refreshQualifications();

    // if we see an '/:id' instead of '/new' in the URL,
    // we are in "update" mode instead of "create" mode
    let url = window.location.href;
    let id = url.slice(url.lastIndexOf('/') + 1, url.length);
    if (id.includes(';')) {
      id = url.slice(url.lastIndexOf('/') + 1, url.indexOf(';'));
    }
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

  sort = (array, key) => {
    array.sort((a, b) => {
      var keyA = a[key];
      var keyB = b[key];
      if (keyA < keyB) {
        return -1;
      }
      if (keyA > keyB) {
        return 1;
      }
      return 0;
    });
    return array;
  };

  refreshQualifications = async () => {
    this.qualifications = [];
    this.traineeQualifications = [];
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

    this.qualifications = this.sort(this.qualifications, 'title');
    this.traineeQualifications = this.sort(this.traineeQualifications, 'title');

    // for filtering
    this.originalQuals = this.qualifications;
    this.originalTQuals = this.traineeQualifications;
  };

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

  filterQuals = (event) => {
    this.qualifications = this.originalQuals;

    // find quals that match query
    let filteredQuals = [];
    this.qualifications.forEach((qual) => {
      let title = qual.title.toLowerCase();
      if (title.includes(this.qualsQuery.toLowerCase())) {
        filteredQuals.push(qual);
      }
    });

    // dedupe quals
    let uniqueQuals = [...new Set(filteredQuals)];
    this.qualifications = uniqueQuals;
  };

  filterTQuals = (event) => {
    this.traineeQualifications = this.originalTQuals;

    // find quals that match query
    let filteredQuals = [];
    this.traineeQualifications.forEach((qual) => {
      let title = qual.title.toLowerCase();
      if (title.includes(this.tqualsQuery.toLowerCase())) {
        filteredQuals.push(qual);
      }
    });

    // dedupe quals
    let uniqueQuals = [...new Set(filteredQuals)];
    this.traineeQualifications = uniqueQuals;
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

  // handle the "Add Position" form being submitted
  submittedPosition = (data) => {
    let token = window.sessionStorage.getItem('token');
    let userInfo = JSON.parse(window.sessionStorage.getItem('userInfo'));
    let userId = userInfo.id;
    const options = {
      headers: { Authorization: 'Bearer ' + token }
    };
    let url = environment.API_URL + '/Quals/add';
    delete this.qualification.id;
    this.qualification.edit = false;
    axios
      .post(url, this.qualification, options)
      .then((response) => {
        // pop success toast and close modal
        this.toast.show('Created Qualification', 'success');
        this.addingQualification = false;
        this.refreshQualifications();
      })
      .catch((error) => {
        this.toast.show('Unable to Create Qualification', 'error');
        this.addingQualification = false;
        console.dir(error);
      });
  };
}
