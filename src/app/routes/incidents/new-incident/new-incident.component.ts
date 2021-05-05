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
    _acres: null,
    _latitude: '',
    _longitude: '',
    _hobbsTime: '',
    _baseCode: '',
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
    id: '',
    name: ''
  };
  selectedDrogueChute = {
    id: ''
  };
  selectedReserveChute = {
    id: ''
  };
  selectedBase = {
    baseCode: '',
    value: ''
  };
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
  T1;
  T2;
  T3;
  totalDays;
  jumpRating = {
    value: ''
  };
  jumperReturnDate;
  jumperArrivalDate;
  incidentJumpers = [];

  // form sections imported from json file
  sections = formData.sections;

  constructor(private router: Router, private toast: ToastService) {}

  async ngOnInit() {
    this.loadFormData();

    // if we see an '/:id' instead of '/new' in the URL,
    // we are in "update" mode instead of "create" mode
    let url = window.location.href;
    let id = url.slice(url.lastIndexOf('/') + 1, url.length);
    if (id.includes(';')) {
      id = url.slice(url.lastIndexOf('/') + 1, url.indexOf(';'));
    }
    if (id !== 'new') {
      this.beginUpdateMode(id);
    } else {
      this.clearForm();
    }
  }

  clearForm = () => {
    this.sections.forEach((section) => {
      section.data.forEach((datum) => {
        if (datum.dropdown) {
          datum.choice = {};
        }
      });
    });
  };

  beginUpdateMode = async (id) => {
    this.mode = 'Update';
    let token = window.sessionStorage.getItem('token');
    let incident = await axios.get(environment.API_URL + '/incidents/' + id, {
      headers: { Authorization: 'Bearer ' + token }
    });
    this.data = incident.data;
    this.data.id = id;
    let date = this.data._incidentDate.split('-');
    this.data._incidentDate =
      date[0] + '-' + date[1] + '-' + date[2].substr(0, 2);

    // get any jumpers associated with the incident
    this.refreshIncidentJumpers();
    // try {
    //   let incJumpers = await axios.get(
    //     environment.API_URL +
    //       '/incidentjumper?incidentId=' +
    //       id +
    //       '&archived=true',
    //     {
    //       headers: { Authorization: 'Bearer ' + token }
    //     }
    //   );
    //   this.incidentJumpers = incJumpers.data.value;
    // } catch (error) {
    //   console.dir(error);
    // }
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
    axios
      .get(environment.API_URL + '/chutereserve', {
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
          chute.name = chute.reserve + ' | ' + chute.Base;
          chute.value = id;
          chute.id = id;
        });
        this.reserveChutes = chutes;
      })
      .catch((error) => {
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
    if (!this.data._hobbsTime) {
      delete this.data._hobbsTime;
    }
    let token = window.sessionStorage.getItem('token');
    let userInfo = JSON.parse(window.sessionStorage.getItem('userInfo'));
    let userId = 111;
    if (userInfo) {
      userId = userInfo.id;
      this.data._baseCode = userInfo.basecode;
    }

    const options = {
      headers: { Authorization: 'Bearer ' + token }
    };
    let url = environment.API_URL + '/incidents/add?userId=' + userId;

    if (this.mode === 'Create') {
      axios
        .post(url, this.data, options)
        .then((response) => {
          this.toast.show('Created incident', 'success');
          this.router.navigate(['/incidents/' + response.data]);
          // workaround for ngIf element not in DOM on initial page load
          let scrollInterval = setInterval(() => {
            let el = document.getElementById('incident-jumpers');
            if (el) {
              el.scrollIntoView();
              clearInterval(scrollInterval);
            }
          }, 1000);
        })
        .catch((error) => {
          console.dir(error);
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
      axios
        .post(url, this.data, options)
        .then((response) => {
          this.toast.show('Updated Incident ' + this.data.id, 'success');
          this.router.navigate(['/incidents']);
        })
        .catch((error) => {
          this.toast.show('Error updating incident', 'error');
          console.dir(error);
        });
    }
  };

  // dropdown handler
  onSelectedDropdownItem = (event, datum) => {
    this.data[datum.key] = event.value;

    // show or hide required asterisks based on selection
    if (datum.key === '_mode') {
      if (event.value === 'Proficiency / Training Jump') {
        let hobbsAsterisk = document.getElementById('hobbs-asterisk');
        if (hobbsAsterisk === null) {
          let hobbsTimeElement = document.querySelector(
            'input[placeholder="Hobbs Time"]'
          );
          let parent = hobbsTimeElement.parentElement;
          let grandpa = parent.parentElement;
          let requiredAsterisk = document.createElement('span');
          requiredAsterisk.setAttribute('class', 'required-asterisk');
          requiredAsterisk.setAttribute('id', 'hobbs-asterisk');
          requiredAsterisk.innerHTML = '*';
          grandpa.appendChild(requiredAsterisk);
        }
        let latitudeAsterisk = document.getElementById('latitude-asterisk');
        if (latitudeAsterisk !== null) {
          latitudeAsterisk.remove();
        }
        let longitudeAsterisk = document.getElementById('longitude-asterisk');
        if (longitudeAsterisk !== null) {
          longitudeAsterisk.remove();
        }
      } else if (event.value === 'Fire Jump') {
        let hobbsAsterisk = document.getElementById('hobbs-asterisk');
        if (hobbsAsterisk === null) {
          let hobbsTimeElement = document.querySelector(
            'input[placeholder="Hobbs Time"]'
          );
          let parent = hobbsTimeElement.parentElement;
          let grandpa = parent.parentElement;
          let requiredAsterisk = document.createElement('span');
          requiredAsterisk.setAttribute('class', 'required-asterisk');
          requiredAsterisk.setAttribute('id', 'hobbs-asterisk');
          requiredAsterisk.innerHTML = '*';
          grandpa.appendChild(requiredAsterisk);
        }
        let longitudeAsterisk = document.getElementById('longitude-asterisk');
        if (longitudeAsterisk === null) {
          let longitudeElement = document.querySelector(
            'input[placeholder="Longitude"]'
          );
          let parent = longitudeElement.parentElement;
          let grandpa = parent.parentElement;
          let requiredAsterisk = document.createElement('span');
          requiredAsterisk.setAttribute('class', 'required-asterisk');
          requiredAsterisk.setAttribute('id', 'longitude-asterisk');
          requiredAsterisk.innerHTML = '*';
          grandpa.appendChild(requiredAsterisk);
        }
        let latitudeAsterisk = document.getElementById('latitude-asterisk');
        if (latitudeAsterisk === null) {
          let latitudeElement = document.querySelector(
            'input[placeholder="Latitude"]'
          );
          let parent = latitudeElement.parentElement;
          let grandpa = parent.parentElement;
          let requiredAsterisk = document.createElement('span');
          requiredAsterisk.setAttribute('class', 'required-asterisk');
          requiredAsterisk.setAttribute('id', 'latitude-asterisk');
          requiredAsterisk.innerHTML = '*';
          grandpa.appendChild(requiredAsterisk);
        }
      } else {
        let hobbsAsterisk = document.getElementById('hobbs-asterisk');
        if (hobbsAsterisk !== null) {
          hobbsAsterisk.remove();
        }
        let latitudeAsterisk = document.getElementById('latitude-asterisk');
        if (latitudeAsterisk !== null) {
          latitudeAsterisk.remove();
        }
        let longitudeAsterisk = document.getElementById('longitude-asterisk');
        if (longitudeAsterisk !== null) {
          longitudeAsterisk.remove();
        }
      }
    }
  };

  // incident jumper methods
  addJumper = () => {
    let jumper = {
      Base: this.selectedBase.value,
      JumperId: this.selectedJumper.id,
      T1: this.T1,
      T2: this.T2,
      T3: this.T3,
      arrivalDate: this.jumperArrivalDate,
      arrivalTime: null,
      drogueId: this.selectedDrogueChute.id,
      homeBaseId: this.selectedJumper.base.id,
      sortOrder: 1,
      jumpRating: this.jumpRating.value.toString(),
      jumperName:
        this.selectedJumper.lastName + ', ' + this.selectedJumper.firstName,
      main: null,
      mainId: this.selectedMainChute.id,
      position1Id: this.selectedPosition1.id,
      position2Id: this.selectedPosition2.id,
      position3Id: this.selectedPosition3.id,
      reserveId: this.selectedReserveChute.id,
      returnDate: this.jumperReturnDate,
      returnTime: null,
      totalDays: this.totalDays
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

  isAddJumperInvalid = () => {
    if (this.selectedJumper && this.selectedBase.value) {
      return false;
    } else {
      return true;
    }
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
    let userInfo = JSON.parse(window.sessionStorage.getItem('userInfo'));
    let userId = 111;
    if (userInfo) {
      userId = userInfo.id;
    }

    const options = {
      headers: { Authorization: 'Bearer ' + token }
    };

    // delete incident jumper
    if (data.action === 'delete') {
      let id = data.jumper.href.slice(
        data.jumper.href.lastIndexOf('/') + 1,
        data.jumper.href.length
      );
      let url =
        environment.API_URL +
        '/incidentjumper/' +
        id +
        '/delete?userId=' +
        userId;
      axios
        .delete(url, options)
        .then((deleted) => {
          this.incidentJumpers.splice(data.index, 1);
          this.toast.show('Removed Jumper ' + id, 'success');
          this.refreshIncidentJumpers();
          this.modal.active = false;
        })
        .catch((error) => {
          this.toast.show('Error removing Jumper', 'error');
          console.dir(error);
        });
    }

    // add incident jumper
    if (data.action === 'addJumper') {
      let url =
        environment.API_URL +
        '/incidentjumper/' +
        this.data.id +
        '/singleAdd?userId=' +
        userId;
      axios
        .post(url, data.jumper, options)
        .then((response) => {
          this.toast.show('Added Jumper', 'success');
          this.refreshIncidentJumpers();
          this.modal.active = false;
        })
        .catch((error) => {
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
        this.incidentJumpers.forEach((jumper) => {
          if (jumper.position1Id) {
            let position = this.qualifications.filter((qualification) => {
              return qualification.id === jumper.position1Id;
            });
            jumper.position1 = position[0].title;
          }
          if (jumper.position2Id) {
            let position = this.qualifications.filter((qualification) => {
              return qualification.id === jumper.position2Id;
            });
            jumper.position2 = position[0].title;
          }
          if (jumper.position3Id) {
            let position = this.qualifications.filter((qualification) => {
              return qualification.id === jumper.position3Id;
            });
            jumper.position3 = position[0].title;
          }
          if (jumper.mainId) {
            let main = this.mainChutes.filter((chute) => {
              let id = chute.href.slice(
                chute.href.lastIndexOf('/') + 1,
                chute.href.lastIndexOf('?')
              );
              return jumper.mainId.toString() === id.toString();
            });
            jumper.main = main[0].main;
          }
          if (jumper.drogueId) {
            let drogue = this.drogueChutes.filter((chute) => {
              let id = chute.href.slice(
                chute.href.lastIndexOf('/') + 1,
                chute.href.lastIndexOf('?')
              );
              return jumper.drogueId.toString() === id.toString();
            });
            jumper.drogue = drogue[0].drogue;
          }
          if (jumper.reserveId) {
            let reserve = this.reserveChutes.filter((chute) => {
              let id = chute.href.slice(
                chute.href.lastIndexOf('/') + 1,
                chute.href.lastIndexOf('?')
              );
              return jumper.reserveId.toString() === id.toString();
            });
            jumper.reserve = reserve[0].reserve;
          }
        });
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
  selectJumpRating = (event) => {
    this.jumpRating = event;
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

  getSizeClass = () => {
    let size = 'A';
    if (this.data._acres > 0.25) {
      size = 'B';
    }
    if (this.data._acres >= 10) {
      size = 'C';
    }
    if (this.data._acres >= 100) {
      size = 'D';
    }
    if (this.data._acres >= 300) {
      size = 'E';
    }
    if (this.data._acres >= 1000) {
      size = 'F';
    }
    if (this.data._acres >= 5000) {
      size = 'G';
    }
    return size;
  };

  // validate lat long values
  valueChanged = (value, datum) => {
    if (datum.key === '_latitude' || datum.key === '_longitude') {
      let regex = new RegExp(
        '(\\d\\d\\s\\d\\d.\\d\\d\\d\\d|\\d\\d\\d\\s\\d\\d.\\d\\d\\d\\d$)'
      );
      datum.valid = regex.test(value);
    }
  };

  // determines the css class for help text
  isHelpValid = (datum) => {
    if (this.data._mode === 'Fire Jump') {
      if (datum.valid) {
        return 'valid';
      } else {
        return 'invalid';
      }
    } else if (this.data[datum.key].length > 0) {
      if (datum.valid) {
        return 'valid';
      } else {
        return 'invalid';
      }
    } else {
      return '';
    }
  };

  // form validation for disabling / enabling the submit button
  isInvalid = () => {
    let invalid = false;
    if (
      !this.data._incidentDate ||
      !this.data._nameofIncident ||
      !this.data._dispatchedFrom_Code ||
      !this.data._areaId ||
      !this.data._stateId ||
      !this.data._methodOfTravel_Id ||
      !this.data._mode ||
      !this.data._departTimeMilitary ||
      !this.data._mission
    ) {
      invalid = true;
    }
    if (this.data._mode === 'Proficiency / Training Jump') {
      if (!this.data._hobbsTime) {
        invalid = true;
      }
    }
    if (this.data._mode === 'Fire Jump') {
      let regex = new RegExp(
        '(\\d\\d\\s\\d\\d.\\d\\d\\d\\d|\\d\\d\\d\\s\\d\\d.\\d\\d\\d\\d$)'
      );
      if (
        regex.test(this.data._latitude) &&
        regex.test(this.data._longitude) &&
        this.data._hobbsTime
      ) {
        invalid = false;
      } else {
        invalid = true;
      }
    }

    return invalid;
  };
}
