import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

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
}
