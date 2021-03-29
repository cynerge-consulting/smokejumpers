import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
  animations: [
    trigger('state', [
      transition(':enter', [
        style({
          right: '-250px'
        }),
        animate(
          '200ms',
          style({
            opacity: 1,
            right: '0px'
          })
        )
      ]),
      transition(':leave', [
        animate(
          '200ms',
          style({
            opacity: 0,
            right: '-250px'
          })
        )
      ])
    ])
  ]
})
export class ToastComponent implements OnInit, OnDestroy {
  show: boolean;
  message: string;
  type: string = 'success';
  duration: number;
  private toastSubscription: Subscription;

  constructor(private toastService: ToastService) {}

  ngOnInit(): void {
    this.toastSubscription = this.toastService.toastState.subscribe((state) => {
      if (state.type) {
        this.type = state.type;
      } else {
        this.type = 'success';
      }
      this.message = state.message;
      this.show = state.show;
      if (this.type === 'error' || this.type === 'warning') {
        this.duration = 10000;
      } else {
        this.duration = 5000;
      }
      setTimeout(() => {
        this.show = false;
      }, this.duration);
    });
  }

  closeToast() {
    this.toastService.dismiss();
  }

  ngOnDestroy(): void {
    this.toastSubscription.unsubscribe();
  }
}
