import { Location } from '@angular/common';
import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Device } from 'src/app/device';
import { DeviceCategory } from 'src/app/device-category';
import { DeviceSubCategoryService } from 'src/app/device-sub-category.service';
import { DeviceSubCategory } from 'src/app/device-subcatgory';
import { DeviceType } from 'src/app/device-type';
import { DeviceService } from 'src/app/device.service';

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.css']
})
export class DeviceComponent implements OnInit, OnDestroy {

  @ViewChild('f', {static: false}) dForm: NgForm ;

  @Input({required: true}) engagementId!: number ; 

  deviceAddedSubscription: Subscription ; 
  deviceChangedSubscription: Subscription ; 
  deviceSelectedSubscription: Subscription ; 
  selectedDevice = new Device() ; 
  deviceCategories!: DeviceCategory[] ; 
  deviceSubCategories!: DeviceSubCategory[];
  deviceTypes: DeviceType[] ;  

  editMode: boolean = false; 

  constructor(private dService: DeviceService, private dscService: DeviceSubCategoryService ,private route: ActivatedRoute, private router: Router, private location: Location) {}
  
  
  ngOnInit(): void {
    this.deviceSelectedSubscription = this.dService.deviceSelected.subscribe(x => {
      this.dService.findById(x).subscribe(x => this.selectedDevice = x) ; 
    })
  }
  
  ngOnDestroy(): void {
    this.deviceSelectedSubscription.unsubscribe() ; 
  }


  onAdd(f: NgForm) {
    
    const value = f.value ; 

    const newDevice: Device = new Device() ; 

    newDevice.engagement.engagementId = this.engagementId ; 
    newDevice.name = value.name; 
    newDevice.ITOwner = value.ITOwner ; 
    newDevice.OSDetail = value.OSDetail ; 
    newDevice.OSFamily = value.OSFamily ; 
    newDevice.applicationServiceName = value.applicationServiceName ; 
    newDevice.deviceId = value.deviceId ; 
    newDevice.environment = value.environment ;
    newDevice.lifecycleStatus = value.lifecycleStatus ;
    newDevice.location = value.location ; 
    newDevice.purpose = value.purpose ; 
    newDevice.subCategory.deviceSubCategoryId = value.subCategory.deviceSubCategoryId ; 
    newDevice.category.deviceCategoryId = value.category.deviceCategoryId ; 

    this.onClear() ; 
  }

  onDelete() {

    this.dService.deleteDevice(this.selectedDevice.deviceId).subscribe() ;

    this.onClear() ; 

  }

  onCancel() {

    this.location.back() ; 

  }

  onClear() {

    this.dForm.reset() ; 
    this.editMode = false ; 

  }

  onCategorySelect(value: any){
    console.log(value);

    // You have to reset the DeviceSubCategory list.
    const deviceId = Number(value) ; 
    this.dscService.findByDeviceCategoryId(deviceId).subscribe(x=> {
      this.deviceSubCategories = x ; 
    })

  }

}
