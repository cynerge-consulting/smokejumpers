import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import axios from 'axios';
import { environment } from '../../../../environments/environment';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'app-new-base',
  templateUrl: './new-base.component.html',
  styleUrls: ['./new-base.component.scss']
})
export class NewBaseComponent implements OnInit {
  mode = 'Create';
  // define base object
  base = {
    id: '',
    affiliated: '',
    edit: false,
    functionArea: '',
    show: false
  };

  // define form sections
  sections = [
    {
      title: 'Base Information',
      data: [
        {
          input: true,
          required: true,
          placeholder: 'Name',
          key: 'name'
        },
        {
          input: true,
          required: true,
          placeholder: 'Code',
          key: 'code'
        },
        {
          choice: {},
          dropdown: true,
          label: 'Active',
          key: 'deleted',
          options: [
            {
              name: 'Yes',
              value: false
            },
            {
              name: 'No',
              value: true
            }
          ]
        }
      ]
    }
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toast: ToastService
  ) {}

  ngOnInit(): void {
    // if we see an '/:id' instead of '/new' in the URL,
    // we are in "update" mode instead of "create" mode
    let url = window.location.href;
    let id = url.slice(url.lastIndexOf('/') + 1, url.length);
    if (id.includes(';')) {
      id = url.slice(url.lastIndexOf('/') + 1, url.indexOf(';'));
    }
    this.base.id = id;
    if (id !== 'new') {
      this.beginUpdateMode(id);
    }
  }

  beginUpdateMode = async (id) => {
    this.mode = 'Update';
    let token = window.sessionStorage.getItem('token');
    let base = await axios.get(environment.API_URL + '/base/' + id, {
      headers: { Authorization: 'Bearer ' + token }
    });
    this.base = base.data;
    this.base.id = id;
  };

  submitForm = (data) => {
    let token = window.sessionStorage.getItem('token');
    let userInfo = JSON.parse(window.sessionStorage.getItem('userInfo'));
    let baseCode = userInfo.basecode;
    const options = {
      headers: { Authorization: 'Bearer ' + token }
    };
    let url = environment.API_URL + '/base/add';

    if (this.mode === 'Create') {
      delete this.base.id;
      this.base.affiliated = baseCode;
      this.base.edit = false;
      axios
        .post(url, this.base, options)
        .then((response) => {
          // pop success toast and redirect to list
          this.toast.show('Created Base', 'success');
          this.router.navigate(['/bases']);
        })
        .catch((error) => {
          this.toast.show('Unable to Create Base', 'error');
          console.dir(error);
        });
    } else if (this.mode === 'Update') {
      url = environment.API_URL + '/base/' + this.base.id + '/update';
      axios
        .post(url, this.base, options)
        .then((response) => {
          // pop success toast and redirect to list
          this.toast.show('Updated Base', 'success');
          this.router.navigate(['/bases']);
        })
        .catch((error) => {
          this.toast.show('Unable to Update Base', 'error');
          console.dir(error);
        });
    }
  };
}
