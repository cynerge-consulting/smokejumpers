import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
import { environment } from '../../../../environments/environment';
import { ToastService } from '../../../services/toast.service';
import * as formData from './form.json';

@Component({
  selector: 'app-new-incident',
  templateUrl: './new-incident.component.html',
  styleUrls: ['./new-incident.component.scss']
})
export class NewIncidentComponent implements OnInit {
  modal = {
    active: false,
    data: {}
  };
  mode = 'Create';
  data = {
    id: '',
    _notes: '',
    _incidentDate: null,
    _nameofIncident: null,
    _dispatchedFrom_Code: null,
    _areaId: null,
    _stateId: null,
    _methodOfTravel_Id: null,
    _mode: null,
    _mission: null,
    _departTimeMilitary: null
  };

  // endpoint data vars
  mainChutes;
  drogueChutes;
  reserveChutes;
  bases;
  dispandreturn;
  pilots;
  travelmodes;
  states;
  agency;
  area;
  qualifications;
  jumpers;

  // incident jumper vars
  selectedMainChute = {
    id: ''
  };
  selectedDrogueChute = {
    id: ''
  };
  selectedReserveChute = {
    id: ''
  };
  selectedBase;
  selectedJumper;
  selectedPosition1 = {
    id: ''
  };
  selectedPosition2 = {
    id: ''
  };
  selectedPosition3 = {
    id: ''
  };
  jumperReturnDate;
  jumperArrivalDate;
  incidentJumpers = [];

  // form sections imported from json file
  sections = formData.sections;

  constructor(private router: Router, private toast: ToastService) { }

  async ngOnInit() {
    this.loadFormData();

    // if we see an '/:id' instead of '/new' in the URL,
    // we are in "update" mode instead of "create" mode
    let url = window.location.href;
    let id = url.slice(url.lastIndexOf('/') + 1, url.length)
    if (id.includes(';')) {
      id = url.slice  (url.lastIndexOf('/') + 1, url.indexOf(';'));
    }
    if (id !== 'new') {
      this.beginUpdateMode(id);
    }
  }

  beginUpdateMode = async (id) => {
    this.mode = 'Update';
    let token = window.sessionStorage.getItem('token');
    let incident = await axios.get(environment.API_URL + '/incidents/' + id, {
      headers: { Authorization: 'Bearer ' + token }
    });
    this.data = incident.data;
    this.data.id = id;
    let date = this.data._incidentDate.split('-');
    this.data._incidentDate = date[0] + '-' + date[1] + '-' + date[2].substr(0, 2);

    // get any jumpers associated with the incident
    try {
      let incJumpers = await axios.get(
        environment.API_URL +
        '/incidentjumper?incidentId=' +
        id +
        '&archived=true',
        {
          headers: { Authorization: 'Bearer ' + token }
        }
      );
      this.incidentJumpers = incJumpers.data.value;
    } catch (error) {
      console.dir(error);
    }
  };

  loadFormData = async () => {
    let token = window.sessionStorage.getItem('token');
    let jumpers = await axios.get(environment.API_URL + '/jumpers', {
      headers: { Authorization: 'Bearer ' + token }
    });
    this.jumpers = jumpers.data.value;
    this.jumpers.forEach((jumper) => {
      jumper.friendly = jumper.firstName + ' ' + jumper.lastName;
    });

    let bases = await axios.get(environment.API_URL + '/base/dropdown/main', {
      headers: { Authorization: 'Bearer ' + token }
    });
    this.bases = bases.data;

    let disps = await axios.get(
      environment.API_URL + '/base/dropdown/dispandreturn/',
      {
        headers: { Authorization: 'Bearer ' + token }
      }
    );
    this.dispandreturn = disps.data;
    this.dispandreturn.forEach((disp) => {
      disp.name = disp.text;
      disp.value = disp.value;
    });

    let pilots = await axios.get(environment.API_URL + '/pilots', {
      headers: { Authorization: 'Bearer ' + token }
    });
    this.pilots = pilots.data.value;
    this.pilots.forEach((pilot) => {
      let id = pilot.href.slice(
        pilot.href.lastIndexOf('/') + 1,
        pilot.href.length
      );
      pilot.name =
        pilot.firstName + ' ' + pilot.lastName + ' | ' + pilot.baseCode;
      pilot.value = id;
    });

    let travelmodes = await axios.get(environment.API_URL + '/travelmodes', {
      headers: { Authorization: 'Bearer ' + token }
    });
    this.travelmodes = travelmodes.data.value;
    this.travelmodes.forEach((travelmode) => {
      let id = Number(
        travelmode.href.slice(
          travelmode.href.lastIndexOf('/') + 1,
          travelmode.href.length
        )
      );
      travelmode.name = travelmode.Aircraft_Name;
      travelmode.value = id;
    });

    let states = await axios.get(environment.API_URL + '/states', {
      headers: { Authorization: 'Bearer ' + token }
    });
    this.states = states.data;
    this.states.forEach((state) => {
      state.name = state.text;
      state.value = state.id;
    });

    let agencies = await axios.get(environment.API_URL + '/agency', {
      headers: { Authorization: 'Bearer ' + token }
    });
    this.agency = agencies.data;
    this.agency.forEach((agency) => {
      agency.name = agency.text;
      agency.value = agency.id;
    });

    let areas = await axios.get(environment.API_URL + '/area', {
      headers: { Authorization: 'Bearer ' + token }
    });
    this.area = areas.data;
    this.area.forEach((area) => {
      area.name = area.text;
      area.value = area.id;
    });

    let qualifications = await axios.get(environment.API_URL + '/Quals', {
      headers: { Authorization: 'Bearer ' + token }
    });
    this.qualifications = qualifications.data.value;
    this.qualifications.forEach((qualification) => {
      qualification.name = qualification.title + ' | ' + qualification.Acronym;
      qualification.value = qualification.id;
    });

    // populate chute comboboxes
    axios
      .get(environment.API_URL + '/chutemain', {
        headers: { Authorization: 'Bearer ' + token }
      })
      .then((response) => {
        let chutes = response.data.value;
        chutes.forEach((chute) => {
          let id = chute.href.slice(
            chute.href.lastIndexOf('/') + 1,
            chute.href.length
          );
          id = Number(id.slice(0, id.lastIndexOf('?')));
          chute.name = chute.chuteType + ' ' + chute.main + ' | ' + chute.Base;
          chute.value = id;
          chute.id = id;
        });
        this.mainChutes = chutes;
      })
      .catch((error) => {
        console.dir(error);
      });
    axios
      .get(environment.API_URL + '/chutedrogue', {
        headers: { Authorization: 'Bearer ' + token }
      })
      .then((response) => {
        let chutes = response.data.value;
        chutes.forEach((chute) => {
          let id = chute.href.slice(
            chute.href.lastIndexOf('/') + 1,
            chute.href.length
          );
          id = Number(id.slice(0, id.lastIndexOf('?')));
          chute.name = chute.drogue + ' | ' + chute.Base;
          chute.value = id;
          chute.id = id;
        });
        this.drogueChutes = chutes;
      })
      .catch((error) => {
        console.dir(error);
      });
    axios.get(environment.API_URL + '/chutereserve', {
      headers: { Authorization: 'Bearer ' + token }
    }).then((response) => {
      let chutes = response.data.value;
      chutes.forEach((chute) => {
        let id = chute.href.slice(chute.href.lastIndexOf('/') + 1, chute.href.length);
        id = Number(id.slice(0, id.lastIndexOf('?')));
        chute.name = chute.reserve + ' | ' + chute.Base;
        chute.value = id;
        chute.id = id;
      });
      this.reserveChutes = chutes;
    }).catch((error) => {
      console.dir(error);
    });

    // populate dropdown options according to formData.sections
    this.sections.forEach((section) => {
      section.data.forEach((datum) => {
        if (datum.endpoint) {
          datum.options = this[datum.endpoint];
        }
        if (datum.dropdown) {
          if (this.data[datum.key]) {
            let choice = datum.options.filter((option) => {
              let optString = option.value;
              let dataString = this.data[datum.key];
              return optString.toString() === dataString.toString();
            });
            if (choice.length) {
              datum.choice = choice[0];
            }
          }
        }
      });
    });
  };

  submitForm = (data) => {
    let token = window.sessionStorage.getItem('token');
    let userInfo = window.sessionStorage.getItem('userInfo');
    // let userId = userInfo.id;
    let userId = 111;

    const options = {
      headers: { Authorization: 'Bearer ' + token }
    };
    let url = environment.API_URL + '/incidents/add?userId=' + userId;

    if (this.mode === 'Create') {
      axios
        .post(url, this.data, options)
        .then((response) => {
          this.toast.show('Created incident', 'success');
          this.router.navigate(['/incidents']);
        })
        .catch((error) => {
          this.toast.show('Error creating incident', 'error');
        });
    } else if (this.mode === 'Update') {
      url =
        environment.API_URL +
        '/incidents' +
        '/' +
        this.data.id +
        '/update?userId=' +
        userId;
      axios.post(url, this.data, options).then((response) => {
        this.toast.show('Updated Incident ' + this.data.id, 'success');
        this.router.navigate(['/incidents']);
      }).catch((error) => {
        this.toast.show('Error updating incident', 'error');
        console.dir(error);
      });
    }
  };

  // dropdown handler
  onSelectedDropdownItem = (event, datum) => {
    this.data[datum.key] = event.value;
  };

  // incident jumper methods
  addJumper = () => {
    let jumper = {
      Base: this.selectedJumper.base.code,
      JumperId: this.selectedJumper.id,
      T1: null,
      T2: null,
      T3: null,
      arrivalDate: this.jumperArrivalDate,
      arrivalTime: '',
      chuteType: '',
      drogueId: this.selectedDrogueChute.id,
      homeBaseId: this.selectedJumper.base.id,
      incidentId: this.data.id,
      jumpOrder: 1,
      jumpRating: '',
      jumperName:
        this.selectedJumper.lastName + ', ' + this.selectedJumper.firstName,
      main: this.selectedJumper.base.code,
      mainId: this.selectedMainChute.id,
      position1Id: this.selectedPosition1.id,
      position2Id: this.selectedPosition2.id,
      position3Id: this.selectedPosition3.id,
      reserveId: this.selectedReserveChute.id,
      returnDate: this.jumperReturnDate,
      returnTime: '',
      totalDays: null
    };
    this.modal = {
      data: {
        content: 'Are you sure you want to add this jumper?',
        deny: 'Cancel',
        confirm: 'Add Jumper',
        action: 'addJumper',
        jumper: jumper
      },
      active: true
    };
  };

  confirmDeleteJumper = (jumper, index) => {
    this.modal = {
      data: {
        content: 'Are you sure you want to remove this jumper?',
        deny: 'Cancel',
        confirm: 'Delete',
        action: 'delete',
        jumper: jumper,
        index: index
      },
      active: true
    };
  };

  modalDenied = (data) => {
    this.modal.active = false;
  };

  modalConfirmed = async (data) => {
    let token = window.sessionStorage.getItem('token');
    let userInfo = window.sessionStorage.getItem('userInfo');
    // let userId = userInfo.id;
    let userId = 111;

    const options = {
      headers: { Authorization: 'Bearer ' + token }
    };

    // delete incident jumper
    if (data.action === 'delete') {
      let id = data.jumper.href.slice(
        data.jumper.href.lastIndexOf('/') + 1,
        data.jumper.href.length
      );
      let url = environment.API_URL + '/incidentjumper/' + id + '/delete?userId=' + userId;
      axios.delete(url, options).then((deleted) => {
        this.incidentJumpers.splice(data.index, 1);
        this.toast.show('Removed Jumper ' + id, 'success');
        this.refreshIncidentJumpers();
        this.modal.active = false;
      }).catch((error) => {
        this.toast.show('Error removing Jumper', 'error');
        console.dir(error);
      });
    }

    // add incident jumper
    if (data.action === 'addJumper') {
      let url = environment.API_URL + '/incidentjumper/' + this.data.id + '/singleAdd?userId=' + userId;
      axios.post(url, data.jumper, options).then((response) => {
        this.toast.show('Added Jumper', 'success');
        this.refreshIncidentJumpers();
        this.modal.active = false;
      }).catch((error) => {
        this.toast.show('Error adding Jumper', 'error');
        this.modal.active = false;
        console.dir(error);
      });
    }
  };

  refreshIncidentJumpers = () => {
    let token = window.sessionStorage.getItem('token');
    axios
      .get(
        environment.API_URL +
        '/incidentjumper?incidentId=' +
        this.data.id +
        '&archived=true',
        {
          headers: { Authorization: 'Bearer ' + token }
        }
      )
      .then((response) => {
        this.incidentJumpers = response.data.value;
      })
      .catch((error) => {
        console.dir(error);
      });
  };

  selectMainChute = (event) => {
    this.selectedMainChute = event;
  };
  selectDrogueChute = (event) => {
    this.selectedDrogueChute = event;
  };
  selectReserveChute = (event) => {
    this.selectedReserveChute = event;
  };
  selectJumper = (event) => {
    this.selectedJumper = event;
  };
  selectBase = (event) => {
    this.selectedBase = event;
  };
  selectJumperPosition = (event, position) => {
    if (position === 1) {
      this.selectedPosition1 = event;
    }
    if (position === 2) {
      this.selectedPosition2 = event;
    }
    if (position === 3) {
      this.selectedPosition3 = event;
    }
  };

  isInvalid = () => {
    let invalid = false
    if (!this.data._incidentDate || !this.data._nameofIncident || !this.data._dispatchedFrom_Code || !this.data._areaId || !this.data._stateId || !this.data._methodOfTravel_Id || !this.data._mode || !this.data._mission || !this.data._departTimeMilitary) {
      invalid = true
    }
    return invalid
  }
}
