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
    id: ''
  };

  // define form sections
  sections = [
    {
      title: 'Qualification Information',
      data: [
        {
          input: true,
          placeholder: 'Title',
          key: 'title'
        },
        {
          input: true,
          placeholder: 'Acronym',
          key: 'Acronym'
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
    // this.qualification.id = id;
  };

  submitForm = (data) => {
    let token = window.sessionStorage.getItem('token');
    let userInfo = window.sessionStorage.getItem('userInfo');
    // let userId = userInfo.id;
    let userId = 111;
    const options = {
      headers: { Authorization: 'Bearer ' + token }
    };
    let url = environment.API_URL + '/Quals';

    if (this.mode === 'Create') {
      axios
        .post(url, this.qualification, options)
        .then((response) => {
          // pop success toast and redirect to list
          this.toast.show('Created Qualification', 'success');
          this.router.navigate(['/qualifications']);
        })
        .catch((error) => {
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
          console.dir(error);
        });
    }
  };
}
