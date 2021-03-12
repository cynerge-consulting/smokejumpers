import { Component, OnInit, Input, HostListener } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnInit {
  showingMenu = false;
  choice = {
    name: ''
  };
  @Input() label: any;
  @Input() options: any;
  @HostListener('document:click', ['$event.target']) public onClick(target) {
    if (!this.elementRef.nativeElement.contains(target)) {
      console.log('clicked something else');
    }
  }

  constructor() {}

  ngOnInit(): void {}

  showMenu = () => {
    this.showingMenu = true;
  };
}
