import { Component, OnInit } from '@angular/core';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-booster',
  templateUrl: './booster.component.html',
  styleUrls: ['./booster.component.scss']
})
export class BoosterComponent implements OnInit {
  constructor(private toastService: ToastService) {}

  ngOnInit(): void {}

  openSuccessToast(): void {
    this.toastService.show('Success Toast', 'success');
  }

  openErrorToast(): void {
    this.toastService.show('Error Toast', 'error');
  }

  openInfoToast(): void {
    this.toastService.show('Info Toast', 'info');
  }

  openWarningToast(): void {
    this.toastService.show('Warning Toast', 'warning');
  }
}
