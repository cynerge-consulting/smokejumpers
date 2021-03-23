import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-bases',
  templateUrl: './bases.component.html',
  styleUrls: ['./bases.component.scss']
})
export class BasesComponent implements OnInit {
  bases = [];
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
      label: 'New Base',
      action: 'create',
      target: 'bases'
    }
  ];

  constructor() {}

  async ngOnInit() {
    let bases = await axios.get(
      environment.API_URL + '/base/dropdown/main'
    );
    this.bases = bases.data;
  }
}
