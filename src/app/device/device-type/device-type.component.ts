import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DeviceType } from 'src/app/device-type';
import { DeviceTypeService } from 'src/app/device-type.service';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-device-type',
  templateUrl: './device-type.component.html',
  styleUrls: ['./device-type.component.css']
})
export class DeviceTypeComponent implements OnInit, OnDestroy{

  @ViewChild('f', {static: false}) dtForm: NgForm ;
  deviceType: DeviceType = new DeviceType() ; 
  editMode: boolean = false ;

  deviceTypeEditingSubcription: Subscription;


  constructor(private dtService: DeviceTypeService, private route: ActivatedRoute, private router: Router,  private location: Location) {

  }

  ngOnInit(): void {
    
    this.deviceTypeEditingSubcription = this.dtService.startedEditing.subscribe(x => {
      this.dtService.findDeviceType(x).subscribe(x => this.deviceType = x) ; 
      this.editMode = true ; 
    }) ; 

  }

  ngOnDestroy(): void {
    
    this.deviceTypeEditingSubcription.unsubscribe() ; 

  }
  

  onAdd(form: NgForm) {
    
    const value = form.value ;

    const newDt = new DeviceType() ; 

    newDt.deviceTypeId = value.deviceTypeId ; 
    newDt.name = value.name ; 

    if(this.editMode) {
      this.dtService.updateDeviceType(newDt.deviceTypeId, newDt).subscribe() ;
    }else {
      this.dtService.addDeviceType(newDt).subscribe() ;
    }

    this.onClear() ;

  }


  onCancel() {
    this.location.back() ; 

  }
  
  onDelete() {
    this.dtService.deleteDeviceType(this.deviceType.deviceTypeId).subscribe()  ;
    this.deviceType = new DeviceType() ; 
    this.onClear()  ;
  }
    
  
  onClear() {
    this.dtForm.reset() ;
    this.editMode = false ;
  }

}
