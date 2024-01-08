import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Device } from 'src/app/device';
import { DeviceService } from 'src/app/device.service';

@Component({
  selector: 'app-device-list',
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.css']
})
export class DeviceListComponent implements OnInit, OnDestroy{


  @Input({required: true}) engagementId: number ;
  
  devices: Device[] = [] ; 
  displayedColumns: string[] = ['name',  'Type', 'Category', 'Sub-Category','ITOwner'] ; 
  selectedDevice: Device ; 
  deviceChangedSubscription: Subscription ; 

  constructor(private dService: DeviceService)  {}
  
  
  ngOnInit(): void {

    this.dService.findByEngagement(this.engagementId).subscribe(x=> this.devices = x) ; 

    this.deviceChangedSubscription = this.dService.devicesChanged.subscribe(x=> this.devices = x) ; 

  }
  ngOnDestroy(): void {

    this.deviceChangedSubscription.unsubscribe() ;

  }

  onDelete(deviceId: number) {
    this.dService.deleteDevice(deviceId).subscribe() ; 
  }

  onSelect(row: Device) {
      this.dService.deviceSelected.next(row.deviceId); 
  }

}
