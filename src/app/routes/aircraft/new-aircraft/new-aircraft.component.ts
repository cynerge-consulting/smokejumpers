import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import axios from 'axios';
import { environment } from '../../../../environments/environment';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'app-new-aircraft',
  templateUrl: './new-aircraft.component.html',
  styleUrls: [
    './new-aircraft.component.scss',
    '../../../components/form/form.component.scss'
  ]
})
export class NewAircraftComponent implements OnInit {
  mode = 'Create';
  id;
  callsign = '';
  // define aircraft object
  aircraft = {
    Aircraft_Name: '',
    Aircraft_Owner: '',
    Aircraft_Tail_Number: '',
    callsign: '',
    active: true,
    homeBase: '',
    homeBaseId: '',
    id: '',
    edit: false,
    deleted: false,
    show: false
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toast: ToastService
  ) {
    this.route.params.subscribe((params) => {
      this.callsign = params.callsign;
    });
  }

  ngOnInit(): void {
    // if we see an '/:id' instead of '/new' in the URL,
    // we are in "update" mode instead of "create" mode
    let url = window.location.href;
    let id = url.slice(url.lastIndexOf('/') + 1, url.length);
    if (id.includes(';')) {
      id = url.slice(url.lastIndexOf('/') + 1, url.indexOf(';'));
    }
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
    this.aircraft.callsign = this.callsign;
    this.aircraft.id = id;
    this.aircraft.active = !this.aircraft.deleted;
  };

  submitForm = (data) => {
    let userInfo = JSON.parse(window.sessionStorage.getItem('userInfo'));
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
          this.toast.show('Aircraft created.', 'success');
          this.router.navigate(['/aircraft']);
        })
        .catch((error) => {
          this.toast.show('Error creating Aircraft.', 'error');
          console.dir(error);
        });
    } else if (this.mode === 'Update') {
      this.aircraft.deleted = !this.aircraft.active;
      this.aircraft.edit = true;
      this.aircraft.show = true;
      this.aircraft.homeBase = userInfo.basecode;
      this.aircraft.homeBaseId = userInfo.baseId;
      url = environment.API_URL + '/travelmodes/' + this.id + '/update';
      axios
        .post(url, this.aircraft, options)
        .then((response) => {
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
