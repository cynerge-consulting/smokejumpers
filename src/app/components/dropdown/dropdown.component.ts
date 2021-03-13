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
  choice = {};
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

  ngOnInit(): void {
    this.loadOptions();
  }

  // for some reason neither async / await nor RxJs subcribtions
  // would wait to resolve the options, so options[0] would be undefined
  // and throw an error on load. this is a bad hack workaround that
  // shouldn't be necessary. look for superior solution
  loadOptions = () => {
    if (this.options) {
      this.choice = this.options[0];
    } else {
      setTimeout(() => {
        this.loadOptions();
      }, 100);
    }
  };

  showMenu = () => {
    this.showingMenu = true;
  };

  select = (option) => {
    this.choice = option;
    this.showingMenu = false;
    this.selectedDropdownItem.emit(option);
  };
}
