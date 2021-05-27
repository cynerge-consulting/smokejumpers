import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import axios from 'axios';
import { environment } from '../../../../environments/environment';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'app-new-qualification',
  templateUrl: './new-qualification.component.html',
  styleUrls: ['./new-qualification.component.scss']
})
export class NewQualificationComponent implements OnInit {
  mode = 'Create';
  // define qualification object
  qualification = {
    id: '',
    edit: false,
    functionArea: '',
    show: false
  };

  // define form sections
  sections = [
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
          placeholder: 'Acronym',
          key: 'Acronym'
        },
        {
          input: true,
          type: 'checkbox',
          placeholder: 'Active',
          key: 'active'
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
    if (id !== 'new') {
      this.beginUpdateMode(id);
    }
  }

  beginUpdateMode = async (id) => {
    this.mode = 'Update';
    let token = window.sessionStorage.getItem('token');
    let qualification = await axios.get(environment.API_URL + '/Quals/' + id, {
      headers: { Authorization: 'Bearer ' + token }
    });
    this.qualification = qualification.data;
  };

  submitForm = (data) => {
    let token = window.sessionStorage.getItem('token');
    let userInfo = JSON.parse(window.sessionStorage.getItem('userInfo'));
    let userId = userInfo.id;
    const options = {
      headers: { Authorization: 'Bearer ' + token }
    };
    let url = environment.API_URL + '/Quals/add';

    if (this.mode === 'Create') {
      delete this.qualification.id;
      this.qualification.edit = false;
      axios
        .post(url, this.qualification, options)
        .then((response) => {
          // pop success toast and redirect to list
          this.toast.show('Created Qualification', 'success');
          this.router.navigate(['/qualifications']);
        })
        .catch((error) => {
          this.toast.show('Unable to Create Qualification', 'error');
          console.dir(error);
        });
    } else if (this.mode === 'Update') {
      url =
        environment.API_URL +
        '/Quals' +
        '/' +
        this.qualification.id +
        '/update?userId=' +
        userId;
      axios
        .post(url, this.qualification, options)
        .then((response) => {
          // pop success toast and redirect to list
          this.toast.show('Updated Qualification', 'success');
          this.router.navigate(['/qualifications']);
        })
        .catch((error) => {
          this.toast.show('Unable to Update Qualification', 'error');
          console.dir(error);
        });
    }
  };
}
