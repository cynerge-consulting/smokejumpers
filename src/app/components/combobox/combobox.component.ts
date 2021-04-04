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
  selector: 'app-combobox',
  templateUrl: './combobox.component.html',
  styleUrls: [
    './combobox.component.scss',
    '../dropdown/dropdown.component.scss'
  ]
})
export class ComboboxComponent implements OnInit {
  query;
  showingMenu = false;
  searching = false;
  hasBeenFiltered = false;
  originalOptions;
  selected;
  @Input() choice = '';
  @Input() key: any;
  @Input() label: any;
  @Input() options;
  @Output() selectedComboboxItem = new EventEmitter<Object>();
  @HostListener('document:click', ['$event.target']) public onClick(target) {
    if (!this.elementRef.nativeElement.contains(target)) {
      this.showingMenu = false;
      this.searching = false;
    }
  }

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {}

  showMenu = () => {
    this.searching = true;
    this.showingMenu = true;
  };

  select = (option) => {
    if (!this.hasBeenFiltered) {
      this.originalOptions = this.options;
    }
    this.choice = option.name;
    this.showingMenu = false;
    this.searching = false;
    this.query = '';
    this.selectedComboboxItem.emit(option);
    this.options = this.originalOptions;
  };

  onKey = (event) => {
    if (!this.searching) {
      this.query = null;
      return;
    }
    // always filter against the original set of options
    if (!this.hasBeenFiltered) {
      this.hasBeenFiltered = true;
      this.originalOptions = this.options;
    }
    this.options = this.originalOptions;

    // find options that match query
    let filteredOptions = [];
    this.options.forEach((option) => {
      let value = option.name.toString().toLowerCase();
      if (value.includes(this.query.toLowerCase())) {
        filteredOptions.push(option);
      }
    });

    // dedupe options
    let uniqueOptions = [...new Set(filteredOptions)];
    this.options = uniqueOptions;
  };
}
