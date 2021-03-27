import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import axios from 'axios';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-new-chute',
  templateUrl: './new-chute.component.html',
  styleUrls: ['./new-chute.component.scss']
})
export class NewChuteComponent implements OnInit {
  params;
  mode = 'Create';
  chute = {
    baseCode: '',
    chuteType: '',
    base: '',
    baseId: '',
    id: ''
  };
  bases;
  selectedBase;

  // define form sections
  sections = [
    {
      title: 'Parachute Information',
      data: [
        // {
        //   choice: {},
        //   dropdown: true,
        //   label: 'Base',
        //   key: 'baseCode',
        //   options: [
        //     {
        //       base: '',
        //       baseId: '',
        //       name: '',
        //       value: ''
        //     }
        //   ]
        // },
        {
          input: true,
          placeholder: 'Chute Number',
          key: 'main'
        },
        {
          choice: {},
          dropdown: true,
          label: 'Chute Type',
          key: 'chuteType',
          options: [
            {
              name: 'Drogue',
              value: 'Drogue'
            },
            {
              name: 'Reserve',
              value: 'Reserve'
            },
            {
              name: 'DC-7',
              value: 'DC-7'
            },
            {
              name: 'FS-14',
              value: 'FS-14'
            },
            {
              name: 'FS-14 Plus',
              value: 'FS-14 Plus'
            },
            {
              name: 'CR-360',
              value: 'CR-360'
            },
            {
              name: 'Prototype',
              value: 'Prototype'
            }
          ]
        },
        {
          dropdown: true,
          label: 'Chute Size',
          key: 'chuteSize',
          choice: {},
          options: [
            {
              name: 'S',
              value: 'S'
            },
            {
              name: 'M',
              value: 'M'
            },
            {
              name: 'L',
              value: 'L'
            }
          ]
        }
      ]
    }
  ];

  constructor(private route: ActivatedRoute, private router: Router) {
    this.route.params.subscribe((params) => {
      this.params = params;
      for (const key in params) {
        if (params.hasOwnProperty(key)) {
          this.mode = 'Update';
          this.chute[key] = params[key];
        }
      }
    });
  }

  async ngOnInit() {
    let token = window.sessionStorage.getItem('token');
    let bases = await axios.get(environment.API_URL + '/base/dropdown/main', {
      headers: { Authorization: 'Bearer ' + token }
    });
    this.bases = bases.data;
    this.bases.forEach((base) => {
      base.name = base.base;
      base.value = base.baseId.toString();
    });
    // populate dropdown options
    this.sections.forEach((section) => {
      section.data.forEach((datum) => {
        if (datum.key === 'baseCode') {
          datum.options = this.bases;
        }
        if (this.params[datum.key]) {
          this.chute[datum.key] = this.params[datum.key];
          if (datum.dropdown) {
            let choice = datum.options.filter(
              (option) =>
                option.value.toString() === this.params[datum.key].toString()
            );
            if (choice.length) {
              datum.choice = choice[0];
            }
          }
        }
      });
    });
  }

  onSelectedDropdownItem = (event, datum) => {
    this.chute[datum.key] = event.value;
  };
  selectBase = (event) => {
    this.chute.base = event.baseCode;
    this.chute.baseId = event.baseId;
  };

  submitForm = async (data) => {
    let token = window.sessionStorage.getItem('token');
    const options = {
      headers: { Authorization: 'Bearer ' + token }
    };
    let type = 'main';
    if (
      this.chute.chuteType === 'Reserve' ||
      this.chute.chuteType === 'Drogue'
    ) {
      type = this.chute.chuteType;
    }
    let url = environment.API_URL + '/chute' + type;

    if (this.mode === 'Create') {
      axios
        .post(url, this.chute, options)
        .then((response) => {
          // pop success toast and redirect to chutes list
          this.router.navigate(['/chutes']);
        })
        .catch((error) => {
          console.dir(error);
        });
    } else if (this.mode === 'Update') {
      url = environment.API_URL + '/chute' + type + '/' + this.chute.id;
      axios
        .put(url, this.chute, options)
        .then((response) => {
          // pop success toast and redirect to chutes list
          this.router.navigate(['/chutes']);
        })
        .catch((error) => {
          console.dir(error);
        });
    }
  };
}
