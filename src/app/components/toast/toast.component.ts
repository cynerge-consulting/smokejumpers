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
          bottom: '-100px',
          transform: 'translate(-50%, 0%) scale(0.3)'
        }),
        animate(
          '200ms',
          style({
            transform: 'translate(-50%, 0%) scale(1)',
            opacity: 1,
            bottom: '60px'
          })
        )
      ]),
      transition(':leave', [
        animate(
          '200ms',
          style({
            transform: 'translate(-50%, 0%) scale(0.3)',
            opacity: 0,
            bottom: '-100px'
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
      }, 3000);
    });
  }

  closeToast() {
    this.toastService.dismiss();
  }

  ngOnDestroy(): void {
    this.toastSubscription.unsubscribe();
  }
}
