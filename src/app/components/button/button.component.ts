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
  @Input() text: any;
  @Output() clicked = new EventEmitter<Object>();

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {}

  clickedButton = (target) => {
    this.clicked.emit(target);
  };
}
