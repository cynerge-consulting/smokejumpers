import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-new-incident',
  templateUrl: './new-incident.component.html',
  styleUrls: ['./new-incident.component.scss']
})
export class NewIncidentComponent implements OnInit {
  statesList = [];

  constructor() {}

  async ngOnInit() {
    const states = await axios.get(environment.API_URL + '/api/states');
    console.log(states);
    const newStatesArray = states.data.forEach((state) => {
      console.log(state.text);
      this.statesList.push(state.text);
    });
    console.log(newStatesArray);
  }
}
