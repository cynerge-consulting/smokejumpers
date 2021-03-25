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
      setTimeout(() => {
        this.show = false;
      }, 30000000);
    });
  }

  closeToast() {
    this.toastService.dismiss();
  }

  ngOnDestroy(): void {
    this.toastSubscription.unsubscribe();
  }
}
