import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import axios from 'axios';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
  dropdown = 'clickmask';
  reportType;
  fileType = 'XLS';
  name;
  showingJumpers = false
  showingJumpersMenu = false
  selectedJumper = {};
  jumpers;
  showingBases = false;
  showingBasesMenu = false;
  bases;
  selectedBase = {};
  showingQualifications = false;
  showingQualificationsMenu = false;
  qualifications;
  selectedQualification;
  showingYear = false;
  showingYearMenu = false;
  selectedYear;

  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe((params) => {
      this.reportType = params.type
      this.prepareReportForm(this.reportType)
    });
  }

  async ngOnInit() {
    this.qualifications = [{
      name: 'qual 1'
    }]
    let jumpers = await axios.get(environment.API_URL + '/api/jumpers');
    this.jumpers = jumpers.data.value
    let bases = await axios.get(environment.API_URL + '/api/base/dropdown/main');
    this.bases = bases.data
    this.selectedBase = this.bases[0]
    this.selectedJumper = this.jumpers[0]
    this.selectedQualification = this.qualifications[0]
  }

  prepareReportForm = (type) => {
    // clear form
    this.showingYear = false;
    this.showingBases = false;
    this.showingJumpers = false;
    this.showingQualifications = false;

    switch (type) {
      case 'baseRoster':
        this.name = 'Base Roster'
        this.showingBases = true
        break;

      case 'boosterSheet':
        this.name = 'Booster Sheet'
        this.showingBases = true
        this.showingJumpers = true
        break;

      case 'daysOff':
        this.name = 'Days Off'
        this.showingBases = true
        break;

      default:
        this.showingBases = true
        this.showingJumpers = true;
        break;
    }
  }

  generateReport = () => {
    console.log('send generate report request')
  }

}
