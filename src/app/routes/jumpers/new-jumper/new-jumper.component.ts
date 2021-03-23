import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-new-jumper',
  templateUrl: './new-jumper.component.html',
  styleUrls: ['./new-jumper.component.scss']
})
export class NewJumperComponent implements OnInit {
  mode = 'Create';
  // define jumper object
  jumper = {
    id: 281,
    href: 'http://dev.wrk.fs.usda.gov/masteraction/services/api/jumpers/281',
    baseId: 1,
    firstName: 'Bobby',
    lastName: 'Jumpsalot',
    grade: 1,
    basePosition: 'quarterback',
    tour: 'Metallica 99',
    spotter: 'Spotty Tom',
    firstAid: 'yes',
    rigger: 'rig',
    ics1: 'ics thing',
    ics2: 'ics thing',
    ics3: 'ics thing',
    ics4: 'ics thing',
    ics5: 'ics thing',
    ics6: 'ics thing',
    ics7: 'ics thing',
    ics8: 'ics thing',
    icst1: 'ics thing',
    icst2: 'ics thing',
    icst3: 'ics thing',
    icst4: 'ics thing',
    lastDayOff: '11',
    payStatus: true,
    activeStatus: true,
    retired: false,
    weight: 642,
    phoneNumber: 911,
    base: {}
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
          type: 'date',
          placeholder: 'Incident Date',
          key: '_incidentDate'
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
    }
  ];

  constructor(private route: ActivatedRoute) {
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
    console.dir(data);
    // validate and send POST to backend
  };
}
