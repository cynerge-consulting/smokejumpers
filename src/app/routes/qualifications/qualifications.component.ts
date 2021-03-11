import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-qualifications',
  templateUrl: './qualifications.component.html',
  styleUrls: ['./qualifications.component.scss']
})
export class QualificationsComponent implements OnInit {
  qualifications = [];
  headings = [
    {
      label: 'ID',
      key: 'id'
    },
    {
      label: 'Text',
      key: 'text'
    },
    {
      label: 'Value',
      key: 'value'
    },
    {
      label: 'Base ID',
      key: 'baseId'
    }
  ];
  settings = [
    {
      label: 'New Chute',
      action: 'create',
      target: 'qualifications'
    }
  ];

  constructor() {}

  async ngOnInit() {
    let qualifications = await axios.get(environment.API_URL + '/api/Quals');
    this.qualifications = qualifications.data;
  }
}
