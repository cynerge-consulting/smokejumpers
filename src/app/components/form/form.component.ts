import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  @Input() sections: any;
  @Input() data: any;
  @Output() submitted = new EventEmitter<Object>();
  currentSection = {
    title: '',
    data: []
  };

  constructor() {}

  ngOnInit(): void {
    this.currentSection = this.sections[0];

    // set default values in this.data for necessary form fields
    this.sections.forEach((section) => {
      section.data.forEach((datum) => {
        // set dropdown default values in this.data
        if (datum.dropdown) {
          this.data[datum.key] = datum.options[0].value;
        }
      });
    });
  }

  goBack = () => {
    let index = this.sections.indexOf(this.currentSection);
    this.currentSection = this.sections[index - 1];
  };
  goForward = () => {
    let index = this.sections.indexOf(this.currentSection);
    this.currentSection = this.sections[index + 1];
  };
  submitForm = (event) => {
    this.submitted.emit(this.data);
  };
  onSelectedDropdownItem = (event, datum) => {
    this.data[datum.key] = event.value;
  };
}
