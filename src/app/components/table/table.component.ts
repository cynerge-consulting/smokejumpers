import { Component, Input, OnInit } from '@angular/core';
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
  showingDetails = false;
  selected;
  rowMenu = 'clickmask';
  details = [];

  constructor(private router: Router) {}

  ngOnInit(): void {}

  edit = (row) => {
    this.rowMenu = 'clickmask';
    let id = '';
    if (row.id) {
      id = row.id;
    } else if (row.href) {
      id = row.href.replace(
        'http://dev.wrk.fs.usda.gov/masteraction/services/api/incidents/',
        ''
      );
    }
    this.router.navigate([this.settings.route + '/' + id, row]);
  };
  delete = (row) => {
    this.rowMenu = 'clickmask';
  };

  new = () => {
    this.router.navigate([this.settings.route + '/new']);
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
}
