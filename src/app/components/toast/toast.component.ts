import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit, OnDestroy {
  show: boolean;
  message: string = 'This is a snackbar';
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

  ngOnDestroy(): void {
    this.toastSubscription.unsubscribe();
  }
}
