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
  isAdmin = false
  loading = false
  showingDownloadData = false
  reports;
  dailyReports = [];
  annualReports = [];
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

  selectedFileType = {
    name: 'XLS',
    value: 'XLS'
  };
  selectedBase = {
    value: ''
  };
  selectedJumper = {};
  selectedQualification;
  selectedYear = {
    name: '2021',
    value: '2021'
  };
  selectedSpotter;
  selectedChute;

  showingSpotters = false;
  showingReports = false;
  showingJumpers = false;
  showingBases = false;
  showingQualifications = false;
  showingYear = false;
  showingChutes = false;
  showingDashboard = true;

  constructor(private route: ActivatedRoute, private router: Router) {
    this.reports = reportsData.reports;
    this.reports.forEach((report) => {
      if (report.period === 'daily') {
        this.dailyReports.push(report);
      } else {
        this.annualReports.push(report);
      }
    });
    this.route.params.subscribe((params) => {
      if (params.type) {
        this.showingDashboard = false;
      } else {
        this.showingDashboard = true;
      }
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
    let token = window.sessionStorage.getItem('token');
    let userInfo = JSON.parse(window.sessionStorage.getItem('userInfo'));
    let role = userInfo.role;
    if (role === 'admin' || role === 'baseadmin' || role === 'sysadmin') {
      this.isAdmin = true
    }
    const options = {
      headers: { Authorization: 'Bearer ' + token }
    };
    let bases = await axios.get(
      environment.API_URL + '/base/dropdown/main',
      options
    );
    this.bases = bases.data;
    let jumpers = await axios.get(environment.API_URL + '/jumpers', options);
    this.jumpers = jumpers.data.value;
    let qualifications = await axios.get(
      environment.API_URL + '/Quals',
      options
    );
    this.qualifications = qualifications.data;

    // parse jumper data for friendly display
    for (let x = 0; x < this.jumpers.length; x++) {
      this.jumpers[x].fullName =
        this.jumpers[x].firstName + this.jumpers[x].lastName;
    }
    this.selectedBase = this.bases[0];
    this.selectedJumper = this.jumpers[0];
    this.selectedQualification = this.qualifications[0];
  }

  goToDash = () => {
    this.showingDownloadData = false
    this.showingDashboard = true
    this.router.navigate(['reports']);
  };

  selectReport = (report) => {
    this.showingDashboard = false;
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

  downloadData = async () => {
    this.loading = true
    let token = window.sessionStorage.getItem('token');
    if (this.selectedFileType.value === 'Incident Info') {
      const options = {
        headers: { Authorization: 'Bearer ' + token }
      };
      let url = environment.API_URL + '/exportIncidentByYear?year=' + this.selectedYear.value;
      let data = await axios.get(url, options)
      this.exportToCsv('IncidentInfo' + '-' + this.selectedYear.value + '.csv', data.data)
      this.loading = false
    } else if (this.selectedFileType.value === 'Incident Jumper') {
      const options = {
        headers: { Authorization: 'Bearer ' + token }
      };
      let url = environment.API_URL + '/exportJumperIncidentyear?year=' + this.selectedYear.value;
      let data = await axios.get(url, options)
      this.exportToCsv('IncidentJumper' + '-' + this.selectedYear.value + '.csv', data.data)
    }
  }

  exportToCsv(filename, rows) {
    if (!rows || !rows.length) {
      return;
    }
    const separator = ',';
    const keys = Object.keys(rows[0]);
    const csvData =
      keys.join(separator) +
      '\n' +
      rows.map(row => {
        return keys.map(k => {
          let cell = row[k] === null || row[k] === undefined ? '' : row[k];
          cell = cell instanceof Date
            ? cell.toLocaleString()
            : cell.toString().replace(/"/g, '""');
          if (cell.search(/("|,|\n)/g) >= 0) {
            cell = `"${cell}"`;
          }
          return cell;
        }).join(separator);
      }).join('\n');

    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    this.loading = false
    if (navigator.msSaveBlob) { // IE 10+
      navigator.msSaveBlob(blob, filename);
    } else {
      const link = document.createElement('a');
      if (link.download !== undefined) {
        // Browsers that support HTML5 download attribute
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', filename);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
  }
}
