import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-new-qualification',
  templateUrl: './new-qualification.component.html',
  styleUrls: ['./new-qualification.component.scss']
})
export class NewQualificationComponent implements OnInit {
  mode = 'Create';
  // define qualification object
  qualification = {};

  // define form sections
  sections = [
    {
      title: 'Qualification Information',
      data: [
        {
          input: true,
          placeholder: 'Name',
          key: 'text'
        },
        {
          input: true,
          placeholder: 'Acronym',
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
          this.qualification[key] = params[key];
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
