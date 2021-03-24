import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import axios from 'axios';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-new-incident',
  templateUrl: './new-incident.component.html',
  styleUrls: ['./new-incident.component.scss']
})
export class NewIncidentComponent implements OnInit {
  params;
  mode = 'Create';
  // define incident object
  data = {
    id: '',
    _notes: ''
  };
  bases;
  selectedBase;
  pilots;
  selectedPilot;
  selectedCopilot;
  selectedSpotter1;
  selectedSpotter2;
  selectedTrainee;
  jumpers;
  selectedJumper;
  incidentJumpers = [];
  // define form sections
  sections = [
    {
      title: 'General Information',
      data: [
        {
          input: true,
          placeholder: 'Incident Name',
          key: '_nameofIncident'
        },
        {
          input: true,
          type: 'date',
          placeholder: 'Incident Date',
          key: '_incidentDate'
        },
        {
          dropdown: true,
          label: 'Dispatched From',
          key: 'DispFromBase',
          choice: {},
          options: [
            {
              name: 'Alabama',
              value: 'alabama'
            },
            {
              name: 'Texers',
              value: 'texas'
            }
          ]
        },
        {
          dropdown: true,
          choice: {},
          label: 'Returned To',
          key: 'ReturnToBase',
          options: [
            {
              name: 'Alabama',
              value: 'alabama'
            },
            {
              name: 'Texers',
              value: 'texas'
            }
          ]
        },
        {
          dropdown: true,
          label: 'To Area',
          key: 'AreaId',
          choice: {},
          options: [
            {
              name: 'LOL',
              value: 'lol'
            },
            {
              name: 'HELLO',
              value: 'hello'
            }
          ]
        },
        {
          dropdown: true,
          label: 'State',
          key: 'StateId',
          choice: {},
          options: [
            {
              name: 'Michigan',
              value: 'michigan'
            },
            {
              name: 'Egypt',
              value: 'egypt'
            }
          ]
        },
        {
          choice: {},
          dropdown: true,
          label: 'Agency',
          key: 'AgencyId',
          options: [
            {
              name: 'AAA',
              value: 'aaa'
            },
            {
              name: 'LMNOP',
              value: 'lmnop'
            }
          ]
        },
        {
          choice: {},
          dropdown: true,
          label: 'Unit Identifier',
          key: 'UnitName',
          options: [
            {
              name: 'unit 1',
              value: '1'
            },
            {
              name: 'unit 2',
              value: '2'
            }
          ]
        },
        {
          input: true,
          placeholder: 'USFS Job Codes',
          key: '_usfsNum'
        },
        {
          input: true,
          placeholder: 'BLM Job Codes',
          key: '_blmNum'
        }
      ]
    },
    {
      title: 'Time and Travel',
      data: [
        {
          choice: {},
          dropdown: true,
          label: 'Method of Travel',
          key: 'Mode',
          options: [
            {
              name: 'Airplane',
              value: 'airplane'
            }
          ]
        },
        {
          input: true,
          placeholder: 'Hobbs Time',
          key: '_hobbsTime'
        },
        {
          input: true,
          placeholder: 'Dispatched Time',
          key: 'Dispatched'
        },
        {
          input: true,
          placeholder: 'Time Over Fire',
          key: '_timeOverFire'
        }
      ]
    },
    {
      title: 'Crew Information',
      data: [
        {
          choice: {},
          dropdown: true,
          label: 'Pilot',
          key: '_pilotId',
          options: [{}]
        },
        {
          choice: {},
          dropdown: true,
          label: 'CoPilot',
          key: '_copilotId',
          options: [{}]
        },
        {
          choice: {},
          dropdown: true,
          label: 'Spotter 1',
          key: '_spotterId',
          options: [{}]
        },
        {
          choice: {},
          dropdown: true,
          label: 'Spotter 2',
          key: '_asstSpotterId',
          options: [{}]
        },
        {
          choice: {},
          dropdown: true,
          label: 'Spotter Trainee',
          key: '_spotterTraineeId',
          options: [{}]
        }
      ]
    },
    {
      title: 'Incident Details',
      data: [
        {
          choice: {},
          dropdown: true,
          label: 'Mode',
          key: '_mode',
          options: [
            {
              name: 'Proficiency / Training Jump',
              value: 'proficiency'
            },
            {
              name: 'Fire Jump',
              value: 'firejump'
            }
          ]
        },
        {
          input: true,
          placeholder: 'Acres',
          key: '_acres'
        },
        {
          dropdown: true,
          label: 'Fuel Type',
          key: '_fuelType',
          choice: {},
          options: [
            {
              name: 'Grass',
              value: 'grass'
            },
            {
              name: 'Shrub',
              value: 'shrub'
            },
            {
              name: 'Slash',
              value: 'slash'
            },
            {
              name: 'Tinder',
              value: 'tinder'
            }
          ]
        },
        {
          dropdown: true,
          choice: {},
          label: 'Initial Attack',
          key: 'InitialAttack',
          options: [
            {
              name: 'Yes',
              value: 'yes'
            },
            {
              name: 'No',
              value: 'no'
            }
          ]
        },
        {
          dropdown: true,
          label: 'Type',
          key: 'Type',
          choice: {},
          options: [
            {
              name: '1',
              value: '1'
            },
            {
              name: '2',
              value: '2'
            }
          ]
        },
        {
          input: true,
          placeholder: 'Latitude',
          key: 'Latitude'
        },
        {
          input: true,
          placeholder: 'Longitude',
          key: 'Longitude'
        },
        {
          dropdown: true,
          choice: {},
          label: 'Yards Of Drift',
          key: '_yardsofDrift',
          options: [
            {
              name: '50',
              value: 50
            },
            {
              name: '100',
              value: 100
            }
          ]
        }
      ]
    },
    {
      title: 'Paracargo Details',
      data: [
        {
          input: true,
          placeholder: '# of Bundles',
          key: '_pcNumberBundles'
        },
        {
          input: true,
          placeholder: 'Total Weight',
          key: '_pcTotalWeight'
        },
        {
          dropdown: true,
          choice: {},
          label: 'Malfunction',
          key: '_pcMalfunction',
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

  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe((params) => {
      this.params = params;
      for (const key in params) {
        if (params.hasOwnProperty(key)) {
          this.mode = 'Update';
          this.data[key] = params[key];
        }
      }
    });
  }

  async ngOnInit() {
    let token = window.sessionStorage.getItem('token');
    let jumpers = await axios.get(environment.API_URL + '/jumpers', {
      headers: { Authorization: 'Bearer ' + token }
    });
    this.jumpers = jumpers.data.value;
    this.jumpers.forEach((jumper) => {
      jumper.friendly = jumper.firstName + ' ' + jumper.lastName;
    });
    let bases = await axios.get(environment.API_URL + '/base/dropdown/main', {
      headers: { Authorization: 'Bearer ' + token }
    });
    this.bases = bases.data;
    let pilots = await axios.get(environment.API_URL + '/pilots', {
      headers: { Authorization: 'Bearer ' + token }
    });
    this.pilots = pilots.data;
    this.pilots.forEach((pilot) => {
      pilot.name = pilot.text;
      pilot.value = pilot.id.toString();
    });
    if (this.mode === 'Update') {
      // get any jumpers associated with the incident
      try {
        let incJumpers = await axios.get(
          environment.API_URL + '/incidentjumpers/' + this.data.id,
          {
            headers: { Authorization: 'Bearer ' + token }
          }
        );
        this.incidentJumpers = incJumpers.data.value;
      } catch (error) {
        console.dir(error);
      }
    }

    // populate dropdown options
    this.sections.forEach((section) => {
      section.data.forEach((datum) => {
        if (
          datum.key === '_pilotId' ||
          datum.key === '_copilotId' ||
          datum.key === '_spotterId' ||
          datum.key === '_asstSpotterId' ||
          datum.key === '_spotterTraineeId'
        ) {
          datum.options = this.pilots;
        }
        if (this.params[datum.key]) {
          this.data[datum.key] = this.params[datum.key];
          if (datum.dropdown) {
            let choice = datum.options.filter(
              (option) => option.value === this.params[datum.key]
            );
            if (choice.length) {
              datum.choice = choice[0];
            }
          }
        }
      });
    });
  }

  submitForm = (data) => {
    console.dir(data);
    // validate and send POST to backend
  };

  onSelectedDropdownItem = (event, datum) => {
    this.data[datum.key] = event.value;
  };

  addJumper = () => {
    this.incidentJumpers.push(this.selectedJumper);
  };
  removeJumper = (jumper) => {
    this.incidentJumpers.splice(jumper);
  };

  selectJumper = (event) => {
    this.selectedJumper = event;
  };

  selectBase = (event) => {
    this.selectedBase = event;
  };
}
