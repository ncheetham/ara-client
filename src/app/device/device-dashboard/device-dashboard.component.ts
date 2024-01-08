import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-device-dashboard',
  templateUrl: './device-dashboard.component.html',
  styleUrls: ['./device-dashboard.component.css']
})
export class DeviceDashboardComponent {


  constructor(private router: Router){}


@Input({required: true}) engagementId: number ; 

  onViewDevices() {

    this.router.navigate(['viewdevice', this.engagementId]) ; 

  }

  onAddDevice() {

    this.router.navigate(['viewDevice', this.engagementId]) ; 

  }

}
