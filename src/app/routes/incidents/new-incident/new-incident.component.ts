import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-incident',
  templateUrl: './new-incident.component.html',
  styleUrls: ['./new-incident.component.scss']
})
export class NewIncidentComponent implements OnInit {
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
          key: 'IncidentName'
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
          key: 'Usfs'
        },
        {
          input: true,
          placeholder: 'BLM Job Codes',
          key: 'BLM Job Codes'
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
          key: 'HobbsTime'
        },
        {
          input: true,
          placeholder: 'Dispatched Time',
          key: 'Dispatched'
        },
        {
          input: true,
          placeholder: 'Time Over Fire',
          key: 'FireNumber'
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
      data: []
    },
    {
      title: 'Paracargo Details',
      data: []
    },
    {
      title: 'Notes',
      data: []
    }
  ];
  currentSection = this.sections[0];

  constructor() {}

  ngOnInit(): void {}

  goBack = () => {
    let index = this.sections.indexOf(this.currentSection);
    this.currentSection = this.sections[index - 1];
  };
  goForward = () => {
    let index = this.sections.indexOf(this.currentSection);
    this.currentSection = this.sections[index + 1];
  };
  submitForm = (data) => {
    console.dir(data);
    // validate and send POST to backend
  };
}
