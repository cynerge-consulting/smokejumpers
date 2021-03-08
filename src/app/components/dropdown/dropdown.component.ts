import {
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  Output,
  EventEmitter
} from '@angular/core';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnInit {
  isOpen: boolean = false;
  isSelected: boolean = false;
  @Input() placeholder: string;
  @Input() required: boolean;
  @Input() selectedValue: any;
  @Input() dropdownOptions = [];
  // Used to toggle dropdown options inside of another component like an ellipsis for example
  @Output()
  toggleDropdownOptions: EventEmitter<boolean> = new EventEmitter<boolean>();

  // This will be removed later once app-clickmask component is implemented
  @HostListener('document:click', ['$event.target']) public onClick(target) {
    const clickedInside = this.elementRef.nativeElement.contains(target);
    if (!clickedInside) {
      this.isOpen = false;
    }
  }

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {}

  toggleDropdown(): void {
    this.isOpen = !this.isOpen;
  }

  changeOption(event: any): void {
    this.selectedValue = event.target.value;
    if (this.placeholder) {
      this.placeholder = event.target.innerText;
    }
    console.log(this.selectedValue);
    this.isOpen = false;
  }
}
