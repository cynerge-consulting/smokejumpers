import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import axios from 'axios';
import { environment } from '../../../environments/environment';
import * as reportsData from './reports.json';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
  dropdown = 'clickmask';
  reportType;
  fileType = 'XLS';
  title;
  reports;
  jumpers;
  spotters;
  bases;
  qualifications;
  years = ['2021', '2020', '2019', '2018'];
  selectedBase = {
    value: ''
  };
  selectedJumper = {};
  selectedQualification;
  selectedYear = '2021';
  showingSpotters = false;
  showingReports = false;
  showingJumpers = false;
  showingBases = false;
  showingQualifications = false;
  showingYear = false;

  constructor(private route: ActivatedRoute, private router: Router) {
    this.reports = reportsData.reports;
    this.route.params.subscribe((params) => {
      this.reportType = params.type;
      this.title = params.title;
      this.showingJumpers = params.jumpers;
      this.showingBases = params.bases;
      this.showingQualifications = params.qualifications;
      this.showingYear = params.year;
      this.showingSpotters = params.spotters;
    });
  }

  async ngOnInit() {
    this.qualifications = [
      {
        name: 'qual 1'
      }
    ];
    let jumpers = await axios.get(environment.API_URL + '/api/jumpers');
    this.jumpers = jumpers.data.value;
    let bases = await axios.get(
      environment.API_URL + '/api/base/dropdown/main'
    );
    this.bases = bases.data;
    this.selectedBase = this.bases[0];
    this.selectedJumper = this.jumpers[0];
    this.selectedQualification = this.qualifications[0];
  }

  selectReport = (report) => {
    this.router.navigate([report.route, report.params]);
  };

  generateReport = async () => {
    let report = axios.post(environment.API_URL + '/api/Reports/getReport', {
      basename: this.selectedBase.value,
      report: this.reportType,
      reportUrl: 'https://dev.wrk.fs.usda.gov/masteraction/reports',
      reporttype: this.fileType
    });
  };
}
