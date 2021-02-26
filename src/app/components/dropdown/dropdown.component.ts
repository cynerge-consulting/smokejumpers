import {
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit
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
  @Input() dropdownOptions = [
    {
      name: 'Angular',
      value: 'angular'
    },
    {
      name: 'Vue',
      value: 'vue'
    },
    {
      name: 'React',
      value: 'react'
    }
  ];

  @HostListener('document:click', ['$event.target']) public onClick(target) {
    const clickedInside = this.elementRef.nativeElement.contains(target);
    if (!clickedInside) {
      this.isOpen = false;
    }
    console.log(this.isOpen);
  }

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {}

  toggleDropdown(): void {
    this.isOpen = !this.isOpen;
    console.log(this.isOpen);
  }

  changeOption(event: any): void {
    console.log(event);
    this.selectedValue = event.target.value;
    this.placeholder = event.target.innerText;
    this.isOpen = false;
  }
}
