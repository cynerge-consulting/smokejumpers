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
  selected;
  rowMenu = 'clickmask';

  constructor() { }

  ngOnInit(): void { }

  edit = (row) => {
    console.dir(row);
    this.rowMenu = 'clickmask';
  };
  delete = (row) => {
    console.dir(row);
    this.rowMenu = 'clickmask';
  };

  action = (setting) => {
    console.dir(setting)
  }
  showSettings = () => {};
}
