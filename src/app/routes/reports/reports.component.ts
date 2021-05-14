import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import axios from 'axios';
import { environment } from '../../../environments/environment';
import * as reportsData from './reports.json';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
  isAdmin = false;
  loading = false;
  showingDownloadData = false;
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
  chutes;
  mainChutes;
  reserveChutes;
  drogueChutes;
  jumpers;
  originalJumpers = [];
  spotters;
  bases;
  qualifications;
  years = [
    {
      name: '2004',
      value: '2004'
    },
    {
      name: '2005',
      value: '2005'
    },
    {
      name: '2006',
      value: '2006'
    },
    {
      name: '2007',
      value: '2007'
    },
    {
      name: '2008',
      value: '2008'
    },
    {
      name: '2009',
      value: '2009'
    },
    {
      name: '2010',
      value: '2010'
    },
    {
      name: '2011',
      value: '2011'
    },
    {
      name: '2012',
      value: '2012'
    },
    {
      name: '2013',
      value: '2013'
    },
    {
      name: '2014',
      value: '2014'
    },
    {
      name: '2015',
      value: '2015'
    },
    {
      name: '2016',
      value: '2016'
    },
    {
      name: '2017',
      value: '2017'
    },
    {
      name: '2018',
      value: '2018'
    },
    {
      name: '2019',
      value: '2019'
    },
    {
      name: '2020',
      value: '2020'
    },
    {
      name: '2021',
      value: '2021'
    }
  ];

  selectedFileType = {
    name: '',
    value: ''
  };
  selectedBase = {
    id: '',
    value: '',
    baseId: ''
  };
  selectedJumper = {
    firstName: '',
    lastName: '',
    id: ''
  };
  selectedQualification = {
    Acronym: ''
  };
  selectedYear = {
    name: '',
    value: ''
  };
  selectedSpotter;
  selectedChute = {
    name: '',
    chutename: 'ALL',
    chutetype: '',
    value: ''
  };
  selectedChuteStyle = {
    name: 'Main',
    value: 'Main',
    chutetype: 1
  };

  showingSpotters = false;
  showingReports = false;
  showingJumpers = false;
  showingBases = false;
  showingQualifications = false;
  showingYear = false;
  showingChutes = false;
  showingDashboard = true;
  showingAllJumpers = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toast: ToastService
  ) {
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
      this.showingAllJumpers = params.alljumpers;
      this.showingBases = params.bases;
      this.showingQualifications = params.qualifications;
      this.showingYear = params.year;
      this.showingSpotters = params.spotters;
      this.showingChutes = params.chutes;
    });
    this.years.reverse();
  }

  async ngOnInit() {
    let token = window.sessionStorage.getItem('token');
    let options = {
      headers: { Authorization: 'Bearer ' + token }
    };
    let userInfo = JSON.parse(window.sessionStorage.getItem('userInfo'));
    let role = userInfo.role;
    let baseCode = userInfo.basecode;

    // check if the user is an admin
    if (role === 'admin' || role === 'baseadmin' || role === 'sysadmin') {
      this.isAdmin = true;
    }

    // get data to populate form fields
    let bases = await axios.get(
      environment.API_URL + '/base/dropdown/main',
      options
    );
    this.bases = bases.data;

    let jumpers = await axios.get(environment.API_URL + '/jumpers', options);
    this.jumpers = jumpers.data.value;
    // parse jumper data for friendly display
    for (let x = 0; x < this.jumpers.length; x++) {
      this.jumpers[x].fullName =
        this.jumpers[x].lastName + ', ' + this.jumpers[x].firstName;
      this.jumpers[x].friendly =
        this.jumpers[x].fullName + ' | ' + this.jumpers[x].base.code;
    }
    this.originalJumpers = this.jumpers;

    let qualifications = await axios.get(
      environment.API_URL + '/Quals',
      options
    );
    this.qualifications = qualifications.data.value;

    let mainChutes = await axios.get(
      environment.API_URL + '/chutemain?baseCode=' + baseCode,
      {
        headers: { Authorization: 'Bearer ' + token }
      }
    );
    this.mainChutes = mainChutes.data.value;
    this.mainChutes.unshift({
      name: 'ALL Parachutes',
      value: 'ALL',
      chutename: 'ALL',
      chutetype: 1
    });
    let drogueChutes = await axios.get(
      environment.API_URL + '/chutedrogue?baseCode=' + baseCode,
      {
        headers: { Authorization: 'Bearer ' + token }
      }
    );
    this.drogueChutes = drogueChutes.data.value;
    this.drogueChutes.unshift({
      name: 'ALL Parachutes',
      value: 'ALL',
      chutename: 'ALL',
      chutetype: 3
    });
    let reserveChutes = await axios.get(
      environment.API_URL + '/chutereserve?baseCode=' + baseCode,
      {
        headers: { Authorization: 'Bearer ' + token }
      }
    );
    this.reserveChutes = reserveChutes.data.value;
    this.reserveChutes.unshift({
      name: 'ALL Parachutes',
      value: 'ALL',
      chutename: 'ALL',
      chutetype: 2
    });

    let chutes = this.mainChutes.concat(
      this.drogueChutes.concat(this.reserveChutes)
    );

    chutes.forEach((chute) => {
      if (chute.main) {
        chute.style = 'Main';
        chute.name = chute.main;
        chute.chutename = chute.main;
        chute.chutetype = 1;
      }
      if (chute.drogue) {
        chute.style = 'Drogue';
        chute.name = chute.drogue;
        chute.chutename = chute.drogue;
        chute.chutetype = 3;
      }
      if (chute.reserve) {
        chute.style = 'Reserve';
        chute.name = chute.reserve;
        chute.chutename = chute.reserve;
        chute.chutetype = 2;
      }
      chute.active = chute.inService ? 'Yes' : 'No';
    });
  }

  goToDash = () => {
    this.showingDownloadData = false;
    this.showingDashboard = true;
    this.router.navigate(['reports']);
  };

  selectReport = (report) => {
    this.showingDashboard = false;
    this.router.navigate([report.route, report.params]);
  };

  selectBase = (base) => {
    this.selectedBase = base;

    this.jumpers = this.originalJumpers;

    // filter jumpers by base
    let filteredJumpers = [];
    this.jumpers.forEach((jumper) => {
      if (jumper.baseId === this.selectedBase.baseId) {
        filteredJumpers.push(jumper);
      }
    });

    // dedupe jumpers
    let uniqueJumpers = [...new Set(filteredJumpers)];
    this.jumpers = uniqueJumpers;
  };

  generateReport = async () => {
    this.loading = true;
    let token = window.sessionStorage.getItem('token');
    const options = {
      headers: { Authorization: 'Bearer ' + token }
    };
    try {
      let request = {
        basename: this.selectedBase.value,
        report: this.reportType,
        reportUrl: 'https://dev.wrk.fs.usda.gov/masteraction/reports',
        reporttype: this.selectedFileType.value,
        year: this.selectedYear.value,
        BaseName: this.selectedBase.value,
        Qual: this.selectedQualification.Acronym,
        JumperIdlist: this.getJumperIds(),
        baseId: this.selectedBase.baseId,
        chutename: this.selectedChute.chutename,
        chutetype: this.selectedChuteStyle.chutetype,
        JumperName:
          this.selectedJumper.lastName + ', ' + this.selectedJumper.firstName,
        jumperId: this.selectedJumper.id
      };
      let report = await axios.post(
        environment.API_URL + '/Reports/getReport',
        request,
        options
      );
      this.getReport(report.data);
    } catch (error) {
      console.dir(error);
      this.loading = false;
      this.toast.show('Unable to generate report', 'error');
    }
  };

  getJumperIds = () => {
    let ids = [];
    this.jumpers.forEach((jumper) => {
      if (jumper.checked) {
        ids.push(jumper.id);
      }
    });
    return ids;
  };

  getReport = async (url) => {
    // strip any quotes that the backend might have sent -__-
    url.replaceAll('"', '');
    let token = window.sessionStorage.getItem('token');
    let options = {
      headers: { Authorization: 'Bearer ' + token }
    };
    try {
      let reportRequest = await axios.get(url + '/info', options);
      let report = reportRequest.data;
      if (report.documentReady) {
        window.open(url, '_blank');
        this.loading = false;
      } else {
        setTimeout(() => {
          this.getReport(url);
        }, 4000);
      }
    } catch (error) {
      this.toast.show('Server is unable to generate a report.', 'error');
      this.loading = false;
    }
  };

  downloadData = async () => {
    this.loading = true;
    let token = window.sessionStorage.getItem('token');
    if (this.selectedFileType.value === 'Incident Info') {
      const options = {
        headers: { Authorization: 'Bearer ' + token }
      };
      let url =
        environment.API_URL +
        '/exportIncidentByYear?year=' +
        this.selectedYear.value;
      let data = await axios.get(url, options);
      this.exportToCsv(
        'IncidentInfo' + '-' + this.selectedYear.value + '.csv',
        data.data
      );
      this.loading = false;
    } else if (this.selectedFileType.value === 'Incident Jumper') {
      const options = {
        headers: { Authorization: 'Bearer ' + token }
      };
      let url =
        environment.API_URL +
        '/exportJumperIncidentyear?year=' +
        this.selectedYear.value;
      let data = await axios.get(url, options);
      this.exportToCsv(
        'IncidentJumper' + '-' + this.selectedYear.value + '.csv',
        data.data
      );
    }
  };

  exportToCsv(filename, rows) {
    if (!rows || !rows.length) {
      return;
    }
    const separator = ',';
    const keys = Object.keys(rows[0]);
    const csvData =
      keys.join(separator) +
      '\n' +
      rows
        .map((row) => {
          return keys
            .map((k) => {
              let cell = row[k] === null || row[k] === undefined ? '' : row[k];
              cell =
                cell instanceof Date
                  ? cell.toLocaleString()
                  : cell.toString().replace(/"/g, '""');
              if (cell.search(/("|,|\n)/g) >= 0) {
                cell = `"${cell}"`;
              }
              return cell;
            })
            .join(separator);
        })
        .join('\n');

    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    this.loading = false;
    if (navigator.msSaveBlob) {
      // IE 10+
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
