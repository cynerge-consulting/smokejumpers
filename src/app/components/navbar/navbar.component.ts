import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Input() location: any;
  @Output() toggledSidenav = new EventEmitter<boolean>();
  showingSidenav = true;

  constructor() {}

  ngOnInit(): void {}

  toggleSidenav = () => {
    this.showingSidenav = !this.showingSidenav;
    this.toggledSidenav.emit(this.showingSidenav);
  };

  logout = () => {
    window.sessionStorage.clear();
    window.location.href = environment.LOGIN_PORTAL;
  };
}
