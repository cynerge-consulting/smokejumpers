import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-new-pilot',
  templateUrl: './new-pilot.component.html',
  styleUrls: ['./new-pilot.component.scss']
})
export class NewPilotComponent implements OnInit {
  mode = 'Create';
  // define qualification object
  pilot = {};

  // define form sections
  sections = [
    {
      title: 'Pilot Information',
      data: [
        {
          input: true,
          placeholder: 'First Name',
          key: 'text'
        },
        {
          input: true,
          placeholder: 'Last Name',
          key: 'value'
        }
      ]
    }
  ];

  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe((params) => {
      for (const key in params) {
        if (params.hasOwnProperty(key)) {
          this.mode = 'Update';
          this.pilot[key] = params[key];
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
