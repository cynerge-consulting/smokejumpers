import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-incident',
  templateUrl: './new-incident.component.html',
  styleUrls: ['./new-incident.component.scss']
})
export class NewIncidentComponent implements OnInit {
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
        }
      ]
    },
    {
      title: 'Time and Travel',
      data: [
        {
          dropdown: true,
          label: 'Method of Travel',
          options: [
            {
              name: 'Airplane',
              value: 'airplane'
            }
          ]
        }
      ]
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
  submitForm = () => {
    console.log('submit form');
  };
}
