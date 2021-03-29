import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  @Input() active: any;
  @Input() data: any;
  @Output() confirmed = new EventEmitter<Object>();
  @Output() denied = new EventEmitter<Object>();

  constructor() {}

  ngOnInit(): void {}

  clickedConfirm = (event) => {
    this.confirmed.emit(this.data);
  };
  clickedDeny = (event) => {
    this.denied.emit(this.data);
  };
}
