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
  reports;
  reportType;
  fileTypes = [
    {
      name: 'XLS',
      value: 'XLS'
    },
    {
      name: 'PDF',
      value: 'PDF'
    }
  ];
  jumpers;
  spotters;
  bases;
  qualifications;
  years = [
    {
      name: '2021',
      value: '2021'
    },
    {
      name: '2020',
      value: '2020'
    },
    {
      name: '2019',
      value: '2019'
    }
  ];

  selectedFileType = 'XLS';
  selectedBase = {
    value: ''
  };
  selectedJumper = {};
  selectedQualification;
  selectedYear = '2021';
  selectedSpotter;
  selectedChute;

  showingSpotters = false;
  showingReports = false;
  showingJumpers = false;
  showingBases = false;
  showingQualifications = false;
  showingYear = false;
  showingChutes = false;

  constructor(private route: ActivatedRoute, private router: Router) {
    this.reports = reportsData.reports;
    this.route.params.subscribe((params) => {
      this.reportType = params.type;
      this.showingJumpers = params.jumpers;
      this.showingBases = params.bases;
      this.showingQualifications = params.qualifications;
      this.showingYear = params.year;
      this.showingSpotters = params.spotters;
      this.showingChutes = params.chutes;
    });
  }

  async ngOnInit() {
    let bases = await axios.get(environment.API_URL + '/base/dropdown/main');
    this.bases = bases.data;
    let jumpers = await axios.get(environment.API_URL + '/jumpers');
    this.jumpers = jumpers.data.value;
    // let qualifications = await axios.get(environment.API_URL + '/qualifications');
    // this.qualifications = qualifications.data
    this.qualifications = [
      {
        name: 'qual 1'
      }
    ];

    // parse jumper data for friendly display
    for (let x = 0; x < this.jumpers.length; x++) {
      this.jumpers[x].fullName =
        this.jumpers[x].firstName + this.jumpers[x].lastName;
    }
    this.selectedBase = this.bases[0];
    this.selectedJumper = this.jumpers[0];
    this.selectedQualification = this.qualifications[0];
  }

  selectReport = (report) => {
    this.router.navigate([report.route, report.params]);
  };

  generateReport = async () => {
    let token = window.sessionStorage.getItem('token');
    const options = {
      headers: { Authorization: 'Bearer ' + token }
    };
    let report = axios.post(
      environment.API_URL + '/Reports/getReport',
      {
        basename: this.selectedBase.value,
        report: this.reportType,
        reportUrl: 'https://dev.wrk.fs.usda.gov/masteraction/reports',
        reporttype: this.selectedFileType
      },
      options
    );
  };
}
