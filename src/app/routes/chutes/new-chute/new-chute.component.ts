import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import axios from 'axios';
import { environment } from '../../../../environments/environment';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'app-new-chute',
  templateUrl: './new-chute.component.html',
  styleUrls: ['./new-chute.component.scss']
})
export class NewChuteComponent implements OnInit {
  params;
  mode = 'Create';
  chute = {
    style: '',
    chuteSize: '',
    baseCode: '',
    chuteType: '',
    Base: '',
    base: '',
    baseId: '',
    id: '',
    main: ''
  };
  chuteStyles = [
    {
      name: 'Main',
      value: 'Main'
    },
    {
      name: 'Drogue',
      value: 'Drogue'
    },
    {
      name: 'Reserve',
      value: 'Reserve'
    }
  ];
  selectedChuteStyle = {
    name: '',
    value: ''
  };
  selectedChuteSize = {
    name: '',
    value: ''
  };
  bases;
  selectedBase = {
    name: '',
    value: ''
  };
  selectedChuteModel = {
    name: '',
    value: ''
  };
  manufacturer = '';
  main = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toast: ToastService
  ) {
    this.route.params.subscribe((params) => {
      this.params = params;

      // determine chute type in order to load proper form
      this.chute.style = this.params.style;
      this.chute.chuteType = this.params.chuteType;

      // get chute id
      if (params.id) {
        this.mode = 'Update';
        this.chute[this.chute.style.toLowerCase()] = this.params[
          this.chute.style.toLowerCase()
        ];
        if (params.id.includes('base')) {
          this.chute.id = params.id.slice(0, params.id.indexOf('?'));
        } else {
          this.chute.id = params.id;
        }
      }

      // get chute base if there is one
      if (params.Base) {
        this.chute.baseCode = params.Base;
      }

      // load form data if there is any passed in
      this.selectedChuteStyle = {
        name: this.params.style,
        value: this.params.style
      };
      this.chute.chuteSize = this.params.chuteSize;
      this.selectedChuteSize = {
        name: this.params.chuteSize,
        value: this.params.chuteSize
      };
      this.selectedBase = {
        name: this.params.Base,
        value: this.params.baseId
      };
      this.selectedChuteModel = {
        name: this.chute.chuteType,
        value: this.chute.chuteType
      };
    });
  }

  async ngOnInit() {
    let token = window.sessionStorage.getItem('token');
    let bases = await axios.get(environment.API_URL + '/base/dropdown/main', {
      headers: { Authorization: 'Bearer ' + token }
    });
    this.bases = bases.data;
    this.bases.forEach((base) => {
      base.name = base.baseCode;
      base.value = base.baseId;
    });

    if (this.mode === 'Update') {
      // get baseId from bases endpoint
      let base = this.bases.filter(
        (base) => base.baseCode === this.chute.baseCode
      );
      if (base.length) {
        this.selectedBase = {
          name: base[0].baseCode,
          value: base[0].baseId
        };
      }
    }
  }

  onSelectedDropdownItem = (event, datum) => {
    this.chute[datum.key] = event.value;
  };
  selectBase = (event) => {
    this.chute.baseId = event.value;
    this.chute.baseCode = event.name;
    this.selectedBase = event;
  };

  selectChuteStyle = (event) => {
    this.selectedChuteStyle = event;
    this.chute.style = event.value;
  };
  selectChuteSize = (event) => {
    this.selectedChuteSize = event;
    this.chute.chuteSize = event.value;
  };
  selectChuteModel = (event) => {
    this.selectedChuteModel = event;
    this.chute.chuteType = event.value;
  };

  submitForm = async (data) => {
    let token = window.sessionStorage.getItem('token');
    const options = {
      headers: { Authorization: 'Bearer ' + token }
    };

    let type = this.selectedChuteStyle.value.toLowerCase();
    let chute = {
      baseCode: this.selectedBase.name,
      base: this.selectedBase.name,
      baseId: this.selectedBase.value,
      chuteType: this.chute.chuteType,
      chuteSize: '',
      [type]: this.chute[type]
    };

    if (this.selectedChuteStyle.value === 'Main') {
      chute.chuteSize = this.selectedChuteSize.value;
    }

    if (this.mode === 'Create') {
      let url = environment.API_URL + '/chute' + type + '/add';
      axios
        .post(url, chute, options)
        .then((response) => {
          this.toast.show('Parachute Created.', 'success');
          this.router.navigate(['/chutes']);
        })
        .catch((error) => {
          this.toast.show('Unable to Create Parachute.', 'error');
          console.dir(error);
        });
    } else if (this.mode === 'Update') {
      let type = this.selectedChuteStyle.value;
      let url =
        environment.API_URL + '/chute' + type + '/' + this.chute.id + '/update';
      axios
        .post(url, chute, options)
        .then((response) => {
          this.toast.show('Parachute Updated.', 'success');
          this.router.navigate(['/chutes']);
        })
        .catch((error) => {
          this.toast.show('Unable to Update Parachute.', 'error');
          console.dir(error);
        });
    }
  };
}
