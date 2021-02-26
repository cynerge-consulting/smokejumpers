import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-incidents',
  templateUrl: './incidents.component.html',
  styleUrls: ['./incidents.component.scss']
})
export class IncidentsComponent implements OnInit {
  incidents = [{
    name: 'incident 1',
    type: 'parachute',
    user: 'bobby jumper',
    date: Date.now()
  }, {
    name: '2nd incident',
    type: 'aircraft',
    user: 'pilot tom',
    date: Date.now()
  }]
  headings = [{
    label: 'Incident',
    key: 'name'
  }, {
    label: 'Type',
    key: 'type',
  }, {
    label: 'Name',
    key: 'user'
  }, {
    label: 'Date',
    key: 'date'
  }]

  constructor() { }

  ngOnInit(): void {
  }

}
