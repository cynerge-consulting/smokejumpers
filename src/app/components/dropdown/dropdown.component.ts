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
  };

  select = (option) => {
    this.choice = option;
    this.showingMenu = false;
    this.selectedDropdownItem.emit(option);
  };
}
