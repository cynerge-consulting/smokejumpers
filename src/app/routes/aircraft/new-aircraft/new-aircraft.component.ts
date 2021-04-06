import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
import { environment } from '../../../../environments/environment';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'app-new-aircraft',
  templateUrl: './new-aircraft.component.html',
  styleUrls: ['./new-aircraft.component.scss']
})
export class NewAircraftComponent implements OnInit {
  mode = 'Create';
  id;
  // define aircraft object
  aircraft = {
    homeBase: 'BOI',
    homeBaseId: 11,
    id: '',
    edit: false,
    deleted: false,
    show: false
  };

  // define form sections
  sections = [
    {
      title: 'Aircraft',
      data: [
        {
          input: true,
          placeholder: 'Name',
          key: 'Aircraft_Name'
        },
        {
          input: true,
          placeholder: 'Owner',
          key: 'Aircraft_Owner'
        },
        {
          input: true,
          placeholder: 'Tail Number',
          key: 'Aircraft_Tail_Number'
        },
        {
          input: true,
          placeholder: 'Call Sign',
          key: 'callsign'
        }
      ]
    }
  ];

  constructor(private router: Router, private toast: ToastService) {}

  ngOnInit(): void {
    // if we see an '/:id' instead of '/new' in the URL,
    // we are in "update" mode instead of "create" mode
    let url = window.location.href;
    let id = url.slice(url.lastIndexOf('/') + 1, url.length);
    if (id !== 'new') {
      this.id = id;
      this.beginUpdateMode(id);
    }
  }

  beginUpdateMode = async (id) => {
    this.mode = 'Update';
    let token = window.sessionStorage.getItem('token');
    let aircraft = await axios.get(environment.API_URL + '/travelmodes/' + id, {
      headers: { Authorization: 'Bearer ' + token }
    });
    this.aircraft = aircraft.data;
    this.aircraft.id = id;
  };

  submitForm = (data) => {
    let token = window.sessionStorage.getItem('token');
    const options = {
      headers: { Authorization: 'Bearer ' + token }
    };
    let url = environment.API_URL + '/travelmodes/add';

    if (this.mode === 'Create') {
      delete this.aircraft.id;
      delete this.aircraft.deleted;
      axios
        .post(url, this.aircraft, options)
        .then((response) => {
          // pop success toast and redirect to chutes list
          this.toast.show('Aircraft created.', 'success');
          this.router.navigate(['/aircraft']);
        })
        .catch((error) => {
          this.toast.show('Error creating Aircraft.', 'error');
          console.dir(error);
        });
    } else if (this.mode === 'Update') {
      this.aircraft.edit = true;
      this.aircraft.deleted = false;
      this.aircraft.show = true;
      this.aircraft.homeBase = 'BOI';
      this.aircraft.homeBaseId = 11;
      url = environment.API_URL + '/travelmodes/' + this.id + '/update';
      axios
        .post(url, this.aircraft, options)
        .then((response) => {
          // pop success toast and redirect to chutes list
          this.toast.show('Aircraft updated.', 'success');
          this.router.navigate(['/aircraft']);
        })
        .catch((error) => {
          this.toast.show('Error updating Aircraft.', 'error');
          console.dir(error);
        });
    }
  };
}
