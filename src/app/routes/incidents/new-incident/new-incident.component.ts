import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import axios from 'axios';
import { environment } from '../../../../environments/environment';
import { ToastService } from '../../../services/toast.service';

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
  dispsandreturn;
  selectedBase;
  pilots;
  travelmodes;
  selectedTravelmode;
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
          key: '_dispatchedFrom_Code',
          choice: {},
          options: [{}]
        },
        {
          dropdown: true,
          choice: {},
          label: 'Returned To',
          key: '_returnedTo_Code',
          options: [{}]
        },
        {
          dropdown: true,
          label: 'To Area',
          key: '_areaId',
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
          key: '_stateId',
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
          key: '_agencyId',
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
          key: '_methodOfTravel_Id',
          options: [
            {
              name: '',
              value: ''
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
          key: '_departTimeMilitary'
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
              value: 'Proficiency / Training Jump'
            },
            {
              name: 'Fire Jump',
              value: 'Fire Jump'
            },
            {
              name: 'Rescue Jump',
              value: 'Rescue Jump'
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
          key: '_initialAttack',
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
          key: '_type',
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
          key: '_latitude'
        },
        {
          input: true,
          placeholder: 'Longitude',
          key: '_longitude'
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
            },
            {
              name: '150',
              value: 150
            },
            {
              name: '200',
              value: 200
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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toast: ToastService
  ) {
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
    let disps = await axios.get(
      environment.API_URL + '/base/dropdown/dispandreturn/',
      {
        headers: { Authorization: 'Bearer ' + token }
      }
    );
    this.dispsandreturn = disps.data;
    this.dispsandreturn.forEach((disp) => {
      disp.name = disp.text.toString();
      disp.value = disp.value.toString();
    });
    let pilots = await axios.get(environment.API_URL + '/pilots', {
      headers: { Authorization: 'Bearer ' + token }
    });
    this.pilots = pilots.data;
    this.pilots.forEach((pilot) => {
      pilot.name = pilot.text;
      pilot.value = pilot.id.toString();
    });
    let travelmodes = await axios.get(environment.API_URL + '/travelmodes', {
      headers: { Authorization: 'Bearer ' + token }
    });
    this.travelmodes = travelmodes.data;
    this.travelmodes.forEach((travelmode) => {
      travelmode.name = travelmode.text;
      travelmode.value = travelmode.id.toString();
    });

    // get any jumpers associated with the incident
    if (this.mode === 'Update') {
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
        if (datum.key === '_methodOfTravel_Id') {
          datum.options = this.travelmodes;
        }
        if (
          datum.key === '_returnedTo_Code' ||
          datum.key === '_dispatchedFrom_Code'
        ) {
          datum.options = this.dispsandreturn;
        }
        if (this.params[datum.key]) {
          this.data[datum.key] = this.params[datum.key];
          if (datum.dropdown) {
            let choice = datum.options.filter(
              (option) =>
                option.value.toString() === this.params[datum.key].toString()
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
    let token = window.sessionStorage.getItem('token');
    const options = {
      headers: { Authorization: 'Bearer ' + token }
    };
    let url = environment.API_URL + '/incidents';

    if (this.mode === 'Create') {
      axios
        .post(url, this.data, options)
        .then((response) => {
          // pop success toast and redirect to chutes list
          this.toast.show('Created incident', 'success');
          this.router.navigate(['/incidents']);
        })
        .catch((error) => {
          this.toast.show('Error creating incident', 'error');
          console.dir(error);
        });
    } else if (this.mode === 'Update') {
      url = environment.API_URL + '/incidents' + '/' + this.data.id;
      axios
        .put(url, this.data, options)
        .then((response) => {
          // pop success toast and redirect to chutes list
          this.toast.show('Updated incident', 'success');
          this.router.navigate(['/incidents']);
        })
        .catch((error) => {
          this.toast.show('Error updating incident', 'error');
          console.dir(error);
        });
    }
  };

  onSelectedDropdownItem = (event, datum) => {
    this.data[datum.key] = event.value;
  };

  addJumper = () => {
    this.incidentJumpers.push(this.selectedJumper);
  };
  removeJumper = (jumper) => {
    this.incidentJumpers.splice(jumper, 1);
  };

  selectJumper = (event) => {
    this.selectedJumper = event;
  };

  selectBase = (event) => {
    this.selectedBase = event;
  };
}
