import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @Input() rows: any;
  @Input() columns: any;
  @Input() settings: any;
  showingDetails = false;
  selected;
  rowMenu = 'clickmask';
  details = [];

  constructor() {}

  ngOnInit(): void {}

  view = (row) => {
    console.dir(row);
    this.rowMenu = 'clickmask';
  };
  edit = (row) => {
    console.dir(row);
    this.rowMenu = 'clickmask';
  };
  delete = (row) => {
    console.dir(row);
    this.rowMenu = 'clickmask';
  };

  action = (setting) => {
    // console.dir(setting);
  };
  showSettings = () => {};
  selectRow = (row) => {
    this.details = [];
    for (const key in row) {
      if (row.hasOwnProperty(key)) {
        this.details.push({ key: key, value: row[key] });
      }
    }
    this.selected = row;
  };
}
