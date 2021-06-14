import {
  Component,
  OnInit,
  Input,
  Output,
  HostListener,
  EventEmitter,
  ElementRef
} from '@angular/core';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnInit {
  showingMenu = false;
  @Input() required: any;
  @Input() choice = {};
  @Input() key: any;
  @Input() label: any;
  @Input() options: any;
  @Output() selectedDropdownItem = new EventEmitter<Object>();
  @HostListener('document:click', ['$event.target']) public onClick(target) {
    if (!this.elementRef.nativeElement.contains(target)) {
      this.showingMenu = false;
    }
  }

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {}

  showMenu = () => {
    this.showingMenu = true;

    // make sure dropdown fits vertically within visible viewport
    let elements = this.elementRef.nativeElement.children[0].children;
    let menu = elements[1];
    if (menu === undefined) {
      setTimeout(() => {
        this.showMenu();
      }, 10);
    } else {
      let rect = menu.getBoundingClientRect();
      if (rect.y + rect.height > window.innerHeight) {
        menu.style.height = window.innerHeight - rect.y - 50 + 'px';
      }
    }
  };

  select = (option) => {
    this.choice = option;
    this.showingMenu = false;
    this.selectedDropdownItem.emit(option);
  };
}
