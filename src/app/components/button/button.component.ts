import {
  Component,
  OnInit,
  ElementRef,
  EventEmitter,
  Output,
  Input
} from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {
  @Input() fab: any;
  @Input() cancel: any;
  @Input() text: any;
  @Input() disabled = false;
  @Output() clicked = new EventEmitter<Object>();

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {}

  clickedButton = (target) => {
    if (this.disabled) {
      return;
    }
    this.clicked.emit(target);
  };
}
