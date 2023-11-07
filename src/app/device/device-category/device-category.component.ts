import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DeviceCategory } from 'src/app/device-category';
import { DeviceCategoryService } from 'src/app/device-category.service';

@Component({
  selector: 'app-device-category',
  templateUrl: './device-category.component.html',
  styleUrls: ['./device-category.component.css']
})
export class DeviceCategoryComponent implements OnInit, OnDestroy {

  @ViewChild('f', {static: false}) dcForm: NgForm ;
  selectedDeviceCategory: DeviceCategory = new DeviceCategory()  ;
  editMode: boolean = false ; 
  dcSelectedSubscription = new Subscription() ; 
  dcChangedSubscription = new Subscription() ; 


  constructor(private dcService: DeviceCategoryService, private location: Location, private router: Router, private route: ActivatedRoute) {}


  ngOnInit(): void {
  
    this.dcSelectedSubscription = this.dcService.startedEditing.subscribe((dcId: number) => {
      this.dcService.findById(dcId).subscribe(x => this.selectedDeviceCategory = x) ;
      this.editMode = true ;  
    }); 

  }

  ngOnDestroy(): void {
    this.dcChangedSubscription.unsubscribe() ; 
    this.dcSelectedSubscription.unsubscribe() ; 
  }

  onAdd(f: NgForm) {

      const value = f.value ; 

      const newDc: DeviceCategory = new DeviceCategory()  ;
      newDc.deviceCategoryId = value.deviceCategoryId ; 
      newDc.name = value.name ; 

      if(this.editMode) {
        this.dcService.updateDeviceCategory(newDc.deviceCategoryId, newDc).subscribe() ; 
      }else {
        this.dcService.addDeviceCategory(newDc).subscribe() ; 
      }

      this.onClear() ; 

  }


  onShowSubCategories() {

    this.router.navigate(['showsubcategories', this.selectedDeviceCategory.deviceCategoryId]) ; 

  } 

  onDelete() {
    this.dcService.deleteDeviceCategory(this.selectedDeviceCategory.deviceCategoryId).subscribe() ;
    this.onClear() ;
  }

  onCancel() {

    this.location.back() ; 

  }

  onClear() {
    this.dcForm.reset() ; 
    this.editMode = false ;
  }



}
