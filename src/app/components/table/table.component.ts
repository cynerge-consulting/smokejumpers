import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @Input() rows: any;
  @Input() columns: any;
  @Input() settings: any;
  @Input() hasActions: false;
  @Output() deleted = new EventEmitter<Object>();
  showingDetails = false;
  selected;
  rowMenu = 'clickmask';
  details = [];
  sorted = true;
  searching = false;
  query;
  hasBeenFiltered;
  originalRows;

  // pagination vars
  start = 0;
  numberOfRows = {
    name: '10',
    value: 10
  };

  constructor(private router: Router) {}

  ngOnInit(): void {}

  edit = (row) => {
    this.rowMenu = 'clickmask';
    let id = '';
    if (row.id) {
      id = row.id;
    } else if (row.href) {
      id = row.href.slice(row.href.lastIndexOf('/') + 1, row.href.length);
    }
    this.router.navigate([this.settings.route + '/' + id, row]);
  };

  delete = (row) => {
    this.rowMenu = 'clickmask';
    this.deleted.emit(row);
  };

  new = () => {
    this.router.navigate([this.settings.route + '/new']);
  };

  sort = (column) => {
    this.rows.sort((a, b) => {
      var keyA = a[column.key];
      var keyB = b[column.key];
      if (keyA < keyB) {
        return this.sorted ? 1 : -1;
      }
      if (keyA > keyB) {
        return this.sorted ? -1 : 1;
      }
      return 0;
    });
    this.sorted = !this.sorted;
  };

  onKey = (event) => {
    if (!this.searching) {
      this.query = null;
      return;
    }
    // always filter against the original set of rows
    if (!this.hasBeenFiltered) {
      this.hasBeenFiltered = true;
      this.originalRows = this.rows;
    }
    this.rows = this.originalRows;

    // find rows that match query
    // **
    // this implementation will filter rows based on what columns are added to the table
    // loop through the keys in the row instead to filter against all the row data instead of just what's shown in the columns fields
    let filteredRows = [];
    for (const key in this.columns) {
      if (this.columns.hasOwnProperty(key)) {
        let column = this.columns[key];
        let colKey = column.key;
        this.rows.forEach((row) => {
          if (!row[colKey]) {
            return;
          }
          let value = row[colKey].toString().toLowerCase();
          if (value.includes(this.query.toLowerCase())) {
            filteredRows.push(row);
          }
        });
      }
    }

    // dedupe rows
    let uniqueRows = [...new Set(filteredRows)];
    this.rows = uniqueRows;
  };

  selectRow = (row) => {
    this.details = [];
    for (const key in row) {
      if (row.hasOwnProperty(key)) {
        this.details.push({ key: key, value: row[key] });
      }
    }
    this.selected = row;
  };

  pageLeft = () => {
    this.start = this.start - this.numberOfRows.value;
    if (this.start < 0) {
      this.start = 0;
    }
  };
  pageRight = () => {
    if (this.start + this.numberOfRows.value * 2 >= this.rows.length) {
      this.start = this.rows.length - this.numberOfRows.value;
      if (this.start < 0) {
        this.start = 0;
      }
    } else {
      this.start = this.start + this.numberOfRows.value;
    }
  };
}
