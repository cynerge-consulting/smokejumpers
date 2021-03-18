import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-new-incident',
  templateUrl: './new-incident.component.html',
  styleUrls: ['./new-incident.component.scss']
})
export class NewIncidentComponent implements OnInit {
  mode = 'Create';
  // define incident object
  incident = {
    IncidentName: '',
    UserId: '',
    DispFromBase: '',
    ReturnToBase: '',
    Usfs: '',
    Blm: '',
    UnitName: '',
    HobbsTime: '',
    TDate: '',
    DepartTime: '',
    ArriveTime: '',
    Mode: '',
    Mission: '',
    Type: '',
    Acres: '',
    SizeClass: '',
    Hours: '',
    InitialAttack: '',
    Lat: '',
    Lon: '',
    NumberPers: '',
    BaseName: '',
    FuelType: '',
    FireNumber: '',
    YardsofDrift: '',
    PcMalfunction: '',
    PcNumberBundles: '',
    PcTotalWeight: '',
    Year: '',
    Pilot1Id: '',
    Pilot2Id: '',
    TravelModeId: '',
    AreaId: '',
    CustomerId: '',
    AgencyId: '',
    StateId: '',
    Spotter1Id: '',
    Spotter2Id: '',
    SpotterTraineeId: '',
    Note: ''
  };

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
          dropdown: true,
          label: 'Pilot',
          key: 'Pilot1Id',
          options: [
            {
              name: 'Mister Pilots',
              value: '1'
            },
            {
              name: 'Maverick',
              value: '2'
            },
            {
              name: 'Goose',
              value: '3'
            }
          ]
        },
        {
          dropdown: true,
          label: 'CoPilot',
          key: 'Pilot2Id',
          options: [
            {
              name: 'Mister Pilots',
              value: '1'
            },
            {
              name: 'Maverick',
              value: '2'
            },
            {
              name: 'Goose',
              value: '3'
            }
          ]
        },
        {
          dropdown: true,
          label: 'Spotter 1',
          key: 'Spotter1Id',
          options: [
            {
              name: 'Mister Pilots',
              value: '1'
            },
            {
              name: 'Maverick',
              value: '2'
            },
            {
              name: 'Goose',
              value: '3'
            }
          ]
        },
        {
          dropdown: true,
          label: 'Spotter 2',
          key: 'Spotter2Id',
          options: [
            {
              name: 'Mister Pilots',
              value: '1'
            },
            {
              name: 'Maverick',
              value: '2'
            },
            {
              name: 'Goose',
              value: '3'
            }
          ]
        },
        {
          dropdown: true,
          label: 'Spotter Trainee',
          key: 'SpotterTraineeId',
          options: [
            {
              name: 'Mister Pilots',
              value: '1'
            },
            {
              name: 'Maverick',
              value: '2'
            },
            {
              name: 'Goose',
              value: '3'
            }
          ]
        }
      ]
    },
    {
      title: 'Incident Details',
      data: [
        {
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
          label: 'Yards Of Drift',
          key: '_yardsofDrift',
          options: [
            {
              name: '50',
              value: '50'
            },
            {
              name: '100',
              value: '100'
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
    },
    {
      title: 'Notes',
      data: [
        {
          textarea: true,
          label: 'Enter Notes Here',
          key: '_notes'
        }
      ]
    }
  ];

  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe((params) => {
      for (const key in params) {
        if (params.hasOwnProperty(key)) {
          this.mode = 'Update';
          this.incident[key] = params[key];
        }
      }
    });
  }

  ngOnInit(): void {}

  submitForm = (data) => {
    console.dir(data);
    // validate and send POST to backend
  };
}
