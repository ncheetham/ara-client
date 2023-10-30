import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DeviceType } from 'src/app/device-type';
import { DeviceTypeService } from 'src/app/device-type.service';

@Component({
  selector: 'app-device-type-list',
  templateUrl: './device-type-list.component.html',
  styleUrls: ['./device-type-list.component.css']
})
export class DeviceTypeListComponent implements OnInit, OnDestroy  {


  deviceTypeSubscription: Subscription ; 
  

   deviceTypes: DeviceType[] ; 
   displayedColumns: String[] = ["name"] ; 
   selectedDeviceType: DeviceType ; 

   constructor(private dtService: DeviceTypeService, private router: Router)  {
    
   }

  ngOnInit(): void {

    this.deviceTypeSubscription = this.dtService.deviceTypesChanged.subscribe(x => {this.deviceTypes = x}) ; 

    this.dtService.findAllDeviceTypes().subscribe(x=> { this.deviceTypes = x ;}) ; 

  }
  ngOnDestroy(): void {

    this.deviceTypeSubscription.unsubscribe() ; 

  }

   onSelect(dt: DeviceType) {
    this.dtService.startedEditing.next(dt.deviceTypeId) ;
  }

  onEditDeviceType(dtId: number) {
    this.router.navigate(['editDeviceType', dtId]) ;
  }

}
