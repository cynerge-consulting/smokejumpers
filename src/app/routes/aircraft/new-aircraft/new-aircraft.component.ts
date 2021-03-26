import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-new-aircraft',
  templateUrl: './new-aircraft.component.html',
  styleUrls: ['./new-aircraft.component.scss']
})
export class NewAircraftComponent implements OnInit {
  mode = 'Create';
  // define aircraft object
  aircraft = {};

  // define form sections
  sections = [
    {
      title: 'Aircraft',
      data: [
        {
          input: true,
          placeholder: 'Name',
          key: 'text'
        },
        {
          input: true,
          placeholder: 'Value',
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
          this.aircraft[key] = params[key];
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
