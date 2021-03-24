import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toastSubject = new Subject<any>();
  public toastState = this.toastSubject.asObservable();

  constructor() {}

  show(message: string, type?: string) {
    this.toastSubject.next({
      show: true,
      message,
      type
    });
  }
}
