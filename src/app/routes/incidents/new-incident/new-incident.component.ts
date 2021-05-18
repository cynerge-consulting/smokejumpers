import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
import { environment } from '../../../../environments/environment';
import { ToastService } from '../../../services/toast.service';
import * as formData from './form.json';

@Component({
  selector: 'app-new-incident',
  templateUrl: './new-incident.component.html',
  styleUrls: [
    './new-incident.component.scss',
    '../../../components/modal/modal.component.scss'
  ]
})
export class NewIncidentComponent implements OnInit {
  @HostListener('ngModelChange', ['$event'])
  onTimeChange(event, type) {
    // force xx:xx format on incident jumper time fields
    if (type === 'arrival') {
      if (event.length === 2) {
        event = event + ':';
      }
      this.jumperArrivalTime = event;
    }
    if (type === 'return') {
      if (event.length === 2) {
        event = event + ':';
      }
      this.jumperReturnTime = event;
    }
  }

  // default mode is 'Create' for /new
  mode = 'Create';

  // import generic form sections from ./form.json
  sections = formData.sections;

  // new incident object
  data = {
    _acres: null,
    _latitude: null,
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
    _identifierId: null,
    _agencyId: null,
    _mode: null,
    _mission: null,
    _departTimeMilitary: null
  };

  // modal vars
  modal = {
    active: false,
    data: {}
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
  identifiers;
  originalIdentifiers;

  // "Add Position" vars
  addingPosition = false;
  qualification = {
    id: '',
    edit: false,
    functionArea: '',
    show: false
  };
  qualificationSections = [
    {
      title: 'Qualification Information',
      data: [
        {
          required: true,
          input: true,
          placeholder: 'Title',
          key: 'title'
        },
        {
          required: true,
          input: true,
          maxlength: 4,
          placeholder: 'Acronym',
          key: 'Acronym'
        }
      ]
    }
  ];

  // incident jumper vars
  keepDate = true;
  selectedIdentifier = {
    id: '',
    value: '',
    name: ''
  };
  selectedMainChute = {
    id: '',
    name: '',
    value: ''
  };
  selectedDrogueChute = {
    id: '',
    value: ''
  };
  selectedReserveChute = {
    id: '',
    value: ''
  };
  selectedBase = {
    baseCode: '',
    value: ''
  };
  selectedJumper = {
    friendly: '',
    id: '',
    base: {
      id: ''
    },
    lastName: '',
    firstName: '',
    name: '',
    value: ''
  };
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
    name: '',
    value: ''
  };
  jumperReturnDate;
  jumperReturnTime;
  jumperArrivalDate;
  jumperArrivalTime;
  incidentJumpers = [];
  editingJumper = false;

  constructor(private router: Router, private toast: ToastService) {}

  async ngOnInit() {
    // if we see an '/:id' instead of '/new' in the URL,
    // we are in "update" mode instead of "create" mode
    let url = window.location.href;
    let id = url.slice(url.lastIndexOf('/') + 1, url.length);
    if (id.includes(';')) {
      id = url.slice(url.lastIndexOf('/') + 1, url.indexOf(';'));
    }
    if (id !== 'new') {
      this.mode = 'Update';
      this.beginUpdateMode(id);
    }

    this.loadFormData();
  }

  // get incident info
  beginUpdateMode = async (id) => {
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
  };

  // get all the data from the backend that is used to populate the form fields
  loadFormData = async () => {
    this.clearForm();
    let token = window.sessionStorage.getItem('token');

    let identifiers = await axios.get(environment.API_URL + '/identifier', {
      headers: { Authorization: 'Bearer ' + token }
    });
    this.identifiers = identifiers.data;
    this.identifiers.forEach((identifier) => {
      identifier.name = identifier.text;
      identifier.value = identifier.id;
    });
    this.originalIdentifiers = this.identifiers;

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

    let pilots = await axios.get(environment.API_URL + '/jumpers', {
      headers: { Authorization: 'Bearer ' + token }
    });
    this.pilots = pilots.data.value;
    this.pilots.forEach((pilot) => {
      let id = pilot.href.slice(
        pilot.href.lastIndexOf('/') + 1,
        pilot.href.length
      );
      pilot.name =
        pilot.firstName + ' ' + pilot.lastName + ' | ' + pilot.base.code;
      pilot.value = id;
    });
    this.pilots.unshift({ name: '', value: '' });

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
        if (datum.dropdown || datum.identifiers) {
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

    // after the data is loaded in all the dropdowns
    // we can start filtering any datasets that need it
    // i.e. identifiers
    this.identifiers = [{ name: '', value: '' }];
    this.filterIdentifiers();
  };

  clearForm = () => {
    this.sections.forEach((section) => {
      section.data.forEach((datum) => {
        if (datum.dropdown || datum.identifiers) {
          datum.choice = {};
        }
      });
    });
  };

  submitForm = (data) => {
    let token = window.sessionStorage.getItem('token');
    let userInfo = JSON.parse(window.sessionStorage.getItem('userInfo'));
    let userId = userInfo.id;
    let options = {
      headers: { Authorization: 'Bearer ' + token }
    };
    let url = environment.API_URL + '/incidents/add?userId=' + userId;
    this.data._baseCode = userInfo.basecode;

    if (!this.data._hobbsTime) {
      delete this.data._hobbsTime;
    }

    // submit a new incident
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

      // submit an updated incident
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

  filterIdentifiers = () => {
    this.identifiers = this.originalIdentifiers;

    let filteredIdentifiers = [];
    this.identifiers.forEach((identifier) => {
      if (
        identifier.areaid === this.data._areaId &&
        identifier.stateid === this.data._stateId &&
        identifier.agencyid === this.data._agencyId
      ) {
        filteredIdentifiers.push(identifier);
      }
    });

    // dedupe identifiers
    let uniqueIdentifiers = [...new Set(filteredIdentifiers)];
    this.identifiers = uniqueIdentifiers;
    this.identifiers.unshift({ name: '', value: '' });
  };

  // generic dropdown handler
  onSelectedDropdownItem = (event, datum) => {
    this.data[datum.key] = event.value;

    if (
      datum.key === '_areaId' ||
      datum.key === '_stateId' ||
      datum.key === '_agencyId'
    ) {
      this.filterIdentifiers();
    }

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

  // handle the "Add Position" form being submitted
  submittedPosition = (data) => {
    let token = window.sessionStorage.getItem('token');
    let userInfo = JSON.parse(window.sessionStorage.getItem('userInfo'));
    let userId = userInfo.id;
    const options = {
      headers: { Authorization: 'Bearer ' + token }
    };
    let url = environment.API_URL + '/Quals/add';
    delete this.qualification.id;
    this.qualification.edit = false;
    axios
      .post(url, this.qualification, options)
      .then((response) => {
        // pop success toast and close modal
        this.toast.show('Created Qualification', 'success');
        this.addingPosition = false;
        axios
          .get(environment.API_URL + '/Quals', {
            headers: { Authorization: 'Bearer ' + token }
          })
          .then((qualifications) => {
            this.qualifications = qualifications.data.value;
            this.qualifications.forEach((qualification) => {
              qualification.name =
                qualification.title + ' | ' + qualification.Acronym;
              qualification.value = qualification.id;
            });
          });
      })
      .catch((error) => {
        this.toast.show('Unable to Create Qualification', 'error');
        this.addingPosition = false;
        console.dir(error);
      });
  };

  // hitting the "Add Jumper" button will bring up a confirm / cancel modal
  addJumper = () => {
    let jumper = {
      Base: this.selectedBase.value,
      JumperId: this.selectedJumper.id,
      T1: this.T1,
      T2: this.T2,
      T3: this.T3,
      arrivalDate: this.jumperArrivalDate,
      arrivalTime: this.jumperArrivalTime,
      drogueId: this.selectedDrogueChute.id,
      homeBaseId: this.selectedJumper.base.id,
      jumpOrder: this.incidentJumpers.length,
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
      returnTime: this.jumperReturnTime,
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

  // validation for the add jumper button
  isAddJumperInvalid = () => {
    if (this.selectedJumper && this.selectedBase.value) {
      return false;
    } else {
      return true;
    }
  };

  // get the incident jumper data from the form and then update it
  updateFormJumper = () => {
    let incidentJumperData = this.incidentJumpers.filter((jumper) => {
      return jumper.JumperId === this.selectedJumper.id;
    });
    let incidentJumper = incidentJumperData[0];
    let id = incidentJumper.href.slice(
      incidentJumper.href.lastIndexOf('/') + 1,
      incidentJumper.href.length
    );
    let jumpOrder = this.incidentJumpers.findIndex(
      (jumper) => jumper.href === incidentJumper.href
    );
    let jumper = {
      incidentId: Number(this.data.id),
      Base: this.selectedBase.value,
      JumperId: this.selectedJumper.id,
      Jumper: this.selectedJumper.friendly,
      T1: this.T1,
      T2: this.T2,
      T3: this.T3,
      chuteType: '',
      arrivalDate: this.jumperArrivalDate,
      arrivalTime: this.jumperArrivalTime,
      drogue: null,
      drogueId: this.selectedDrogueChute.value,
      homeBaseId: this.selectedJumper.base.id,
      hideEdit: false,
      jumpOrder: jumpOrder,
      jumpRating: this.jumpRating.value.toString(),
      jumperName:
        this.selectedJumper.lastName + ', ' + this.selectedJumper.firstName,
      main: null,
      mainId: this.selectedMainChute.value,
      position1Id: this.selectedPosition1.id,
      position2Id: this.selectedPosition2.id,
      position3Id: this.selectedPosition3.id,
      Pos1: this.selectedPosition1.id,
      Pos2: this.selectedPosition2.id,
      Pos3: this.selectedPosition3.id,
      reserve: null,
      reserveId: this.selectedReserveChute.value,
      returnDate: this.jumperReturnDate,
      returnTime: this.jumperReturnTime,
      totalDays: this.totalDays
    };
    this.updateJumper(jumper, id);
  };

  // send request to backend to update an incident jumper
  updateJumper = (jumper, id) => {
    let token = window.sessionStorage.getItem('token');
    let userInfo = JSON.parse(window.sessionStorage.getItem('userInfo'));
    let userId = userInfo.id;
    const options = {
      headers: { Authorization: 'Bearer ' + token }
    };

    let url =
      environment.API_URL +
      '/incidentjumper/' +
      id +
      '/update?userId=' +
      userId;
    axios
      .post(url, jumper, options)
      .then((response) => {
        this.toast.show('Updated Jumper', 'success');
        // refresh the IJ display to show the updated data
        this.refreshIncidentJumpers();
        // clear the IJ form after updating the IJ
        this.cancelJumperEdit();
        // scroll to the updated IJ
        let updatedJumperDOMElement = document.getElementById(jumper.JumperId);
        updatedJumperDOMElement.scrollIntoView();
      })
      .catch((error) => {
        this.toast.show('Error Updating Jumper', 'error');
        console.dir(error);
      });
  };

  moveJumper = (direction, jumper, index) => {
    // can not move higher
    if (direction === 'up' && index === 0) {
      return;
    }
    // can not move lower
    if (direction === 'down' && index === this.incidentJumpers.length - 1) {
      return;
    }

    let targetIndex = index + (direction === 'up' ? -1 : 1);
    let target = this.incidentJumpers[targetIndex];
    this.incidentJumpers[targetIndex] = jumper;
    this.incidentJumpers[index] = target;
    let jumpOrder = this.incidentJumpers.findIndex(
      (ij) => jumper.href === ij.href
    );
    jumper.jumpOrder = jumpOrder;
    jumpOrder = this.incidentJumpers.findIndex((ij) => target.href === ij.href);
    target.jumpOrder = jumpOrder;
    this.updateJumper(target, Number(target.id));
    this.updateJumper(jumper, Number(jumper.id));
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
    let userId = userInfo.id;

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
          this.cancelJumperEdit();
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
          let id = jumper.href.slice(
            jumper.href.lastIndexOf('/') + 1,
            jumper.href.length
          );
          jumper.id = id;
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
          if (jumper.arrivalDate) {
            let date = jumper.arrivalDate.split('-');
            jumper.friendlyArrivalDate =
              Number(date[1]) + '/' + date[2].slice(0, 2) + '/' + date[0];
          }
          if (jumper.arrivalTime) {
            if (jumper.arrivalTime.includes(':')) {
              jumper.friendlyArrivalTime = jumper.arrivalTime;
            } else {
              jumper.friendlyArrivalTime =
                jumper.arrivalTime[0] +
                jumper.arrivalTime[1] +
                ':' +
                jumper.arrivalTime[2] +
                jumper.arrivalTime[3];
            }
          }
          if (jumper.returnTime) {
            if (jumper.returnTime.includes(':')) {
              jumper.friendlyReturnTimeTime = jumper.returnTime;
            } else {
              jumper.friendlyReturnTime =
                jumper.returnTime[0] +
                jumper.returnTime[1] +
                ':' +
                jumper.returnTime[2] +
                jumper.returnTime[3];
            }
          }
          if (jumper.returnDate) {
            let date = jumper.returnDate.split('-');
            jumper.friendlyReturnDate =
              Number(date[1]) + '/' + date[2].slice(0, 2) + '/' + date[0];
          }
        });

        // sort jumpers by jump jumpOrder
        this.incidentJumpers.sort((a, b) => {
          var keyA = a['jumpOrder'];
          var keyB = b['jumpOrder'];
          if (keyA < keyB) {
            return -1;
          }
          if (keyA > keyB) {
            return 1;
          }
          return 0;
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

  // generic model change validation (redundant with isHelpValid() ?)
  valueChanged = (value, datum) => {
    if (datum.key === '_latitude' || datum.key === '_longitude') {
      let regex = new RegExp(
        '(\\w\\w\\s\\w\\w.\\w\\w\\w\\w|\\w\\w\\w\\s\\w\\w.\\w\\w\\w\\w$)'
      );
      datum.valid = regex.test(value);
    }
    if (datum.key === '_hobbsTime') {
      let regex = new RegExp('^\\d+(\\.\\d+)*$');
      datum.valid = regex.test(value);
    }
    if (datum.key === '_departTimeMilitary') {
      let regex = new RegExp('^\\d\\d+\\:\\d+$');
      datum.valid = regex.test(value);
    }
  };

  // determines the css class for help text
  isHelpValid = (datum) => {
    if (datum.key === '_latitude' || datum.key === '_longitude') {
      let regex = new RegExp(
        '(\\w\\w\\s\\w\\w.\\w\\w\\w\\w|\\w\\w\\w\\s\\w\\w.\\w\\w\\w\\w$)'
      );
      datum.valid = regex.test(this.data[datum.key]);
    }
    if (datum.key === '_hobbsTime') {
      let regex = new RegExp('^\\d+(\\.\\d+)*$');
      datum.valid = regex.test(this.data[datum.key]);
    }
    if (datum.key === '_departTimeMilitary') {
      let regex = new RegExp('^\\d\\d+\\:\\d+$|\\d\\:\\d\\d$');
      datum.valid = regex.test(this.data[datum.key]);
    }
    if (this.data[datum.key] && this.data[datum.key].length > 0) {
      if (datum.valid) {
        return 'valid';
      } else {
        return 'invalid';
      }
    } else {
      return '';
    }
  };

  // incident form validation, disables / enables the submit button
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
    let departedRegex = new RegExp('^\\d\\d+\\:\\d+$|\\d\\:\\d\\d$');
    if (departedRegex.test(this.data._departTimeMilitary)) {
      invalid = false;
    } else {
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
      let hobbsregex = new RegExp('^\\d+(\\.\\d+)*$');
      if (
        regex.test(this.data._latitude) &&
        regex.test(this.data._longitude) &&
        hobbsregex.test(this.data._hobbsTime)
      ) {
        invalid = false;
      } else {
        invalid = true;
      }
    }

    return invalid;
  };

  // load an incident jumper into the IJ form
  editJumper = (jumper, index) => {
    // clear the form of any prior data
    this.cancelJumperEdit();

    // get the full jumper data for the incident jumper display
    let splitName = jumper.jumperName.split(',');
    let friendlyName = splitName[1] + ' ' + splitName[0];
    friendlyName = friendlyName.slice(1, friendlyName.length);
    let jumperData = this.jumpers.filter((j) => {
      return j.friendly === friendlyName;
    });
    jumperData = jumperData[0];

    let mainChute = this.mainChutes.filter((chute) => {
      return chute.id === jumper.mainId;
    });
    mainChute = mainChute[0];
    if (mainChute) {
      this.selectedMainChute = mainChute;
    }
    let drogueChute = this.drogueChutes.filter((chute) => {
      return chute.id === jumper.drogueId;
    });
    drogueChute = drogueChute[0];
    if (drogueChute) {
      this.selectedDrogueChute = drogueChute;
    }
    let reserveChute = this.reserveChutes.filter((chute) => {
      return chute.id === jumper.reserveId;
    });
    reserveChute = reserveChute[0];
    if (reserveChute) {
      this.selectedReserveChute = reserveChute;
    }

    this.selectedBase = {
      baseCode: jumper.Base,
      value: jumper.Base
    };

    this.selectedJumper = jumperData;
    if (jumper.position1Id) {
      let pos1 = this.qualifications.filter((qualification) => {
        return qualification.id === jumper.position1Id;
      });
      this.selectedPosition1 = pos1[0];
    }
    if (jumper.position2Id) {
      let pos2 = this.qualifications.filter((qualification) => {
        return qualification.id === jumper.position2Id;
      });
      this.selectedPosition2 = pos2[0];
    }
    if (jumper.position3Id) {
      let pos3 = this.qualifications.filter((qualification) => {
        return qualification.id === jumper.position3Id;
      });
      this.selectedPosition3 = pos3[0];
    }
    this.T1 = jumper.T1;
    this.T2 = jumper.T2;
    this.T3 = jumper.T3;
    this.totalDays = jumper.totalDays;
    this.jumpRating = {
      name: jumper.jumpRating,
      value: jumper.jumpRating
    };
    if (jumper.returnDate && !this.keepDate) {
      this.jumperReturnDate = jumper.returnDate.slice(0, 10);
    }
    if (jumper.returnTime && !this.keepDate) {
      this.jumperReturnTime = jumper.returnTime;
    }
    if (jumper.arrivalDate && !this.keepDate) {
      this.jumperArrivalDate = jumper.arrivalDate.slice(0, 10);
    }
    if (jumper.arrivalTime && !this.keepDate) {
      this.jumperArrivalTime = jumper.arrivalTime;
    }

    this.editingJumper = true;
    let jumperForm = document.getElementById('jumperForm');
    jumperForm.scrollIntoView();
  };

  // clear the IJ form
  cancelJumperEdit = () => {
    this.editingJumper = false;
    this.selectedMainChute = {
      id: '',
      name: '',
      value: ''
    };
    this.selectedDrogueChute = {
      id: '',
      value: ''
    };
    this.selectedReserveChute = {
      id: '',
      value: ''
    };
    this.selectedBase = {
      baseCode: '',
      value: ''
    };
    this.selectedJumper = {
      friendly: '',
      id: '',
      base: {
        id: ''
      },
      lastName: '',
      firstName: '',
      name: '',
      value: ''
    };
    this.selectedPosition1 = {
      id: ''
    };
    this.selectedPosition2 = {
      id: ''
    };
    this.selectedPosition3 = {
      id: ''
    };
    this.T1 = null;
    this.T2 = null;
    this.T3 = null;
    this.totalDays = null;
    this.jumpRating = {
      name: '',
      value: ''
    };
    if (!this.keepDate) {
      this.jumperReturnDate = null;
      this.jumperArrivalDate = null;
      this.jumperReturnTime = null;
      this.jumperArrivalTime = null;
    }
  };
}
