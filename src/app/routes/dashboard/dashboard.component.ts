import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  constructor(private router: Router, private toastService: ToastService) {}

  ngOnInit(): void {
    // redirect to incidents as default page
    // this.router.navigate(['incidents']);
  }

  openToast(): void {
    this.toastService.show('I"m the toast component!', 'info');
  }
}
