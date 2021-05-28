import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  @Input() cancel: any;
  @Input() sections: any;
  @Input() data: any;
  @Input() mode: any;
  @Output() submitted = new EventEmitter<Object>();

  constructor(private router: Router) {}

  ngOnInit(): void {
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

  submitForm = (event) => {
    this.submitted.emit(this.data);
  };
  onSelectedDropdownItem = (event, datum) => {
    this.data[datum.key] = event.value;
  };
  onCancel = () => {
    this.router.navigate([this.cancel]);
  };
}
