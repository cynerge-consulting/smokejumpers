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
  }

  goBack = () => {
    let index = this.sections.indexOf(this.currentSection);
    this.currentSection = this.sections[index - 1];
  };
  goForward = () => {
    console.dir(this.currentSection);
    let index = this.sections.indexOf(this.currentSection);
    this.currentSection = this.sections[index + 1];
  };
  submitForm = (event) => {
    console.dir(this.data);
    this.submitted.emit(this.data);
  };
}
