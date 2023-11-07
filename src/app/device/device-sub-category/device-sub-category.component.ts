import { Location } from '@angular/common';
import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DeviceSubCategoryService } from 'src/app/device-sub-category.service';
import { DeviceSubCategory } from 'src/app/device-subcatgory';

@Component({
  selector: 'app-device-sub-category',
  templateUrl: './device-sub-category.component.html',
  styleUrls: ['./device-sub-category.component.css']
})
export class DeviceSubCategoryComponent implements OnInit, OnDestroy{

  constructor(private dscService: DeviceSubCategoryService, private location: Location) {}


  dscSelectedSubscription: Subscription ; 


  ngOnInit(): void {
    
    this.dscSelectedSubscription = this.dscService.subCategorySelected.subscribe(x =>
      {
        this.dscService.findById(x).subscribe(x => this.selectedSubCategory = x) ; 
      }) ; 


  }
  ngOnDestroy(): void {
    this.dscSelectedSubscription.unsubscribe() ; 
  }

  selectedSubCategory: DeviceSubCategory = new DeviceSubCategory() ; 
  editMode: boolean = false ; 

  @Input({required: true}) deviceCategoryId: number ; 
  @ViewChild('f', {static: false}) dscForm: NgForm ; 
  


  onAdd(aForm: NgForm) {
    
    const value = aForm.value ; 

    const newSubCategory = new DeviceSubCategory() ; 
    newSubCategory.deviceSubCategoryId = value.deviceSubCategoryId ; 
    newSubCategory.name = value.name ; 
    newSubCategory.deviceCategory.deviceCategoryId = this.deviceCategoryId;

    this.dscService.addSubCategory(newSubCategory).subscribe() ; 

    this.onClear() ; 

  }
    

  onDelete() {
    this.dscService.deleteSubCatgory(this.selectedSubCategory.deviceSubCategoryId).subscribe() ; 
    this.onClear() ; 
  }

  onClear() {
    this.dscForm.reset() ;
    this.editMode = false ; 
  }

  onCancel() {
    this.location.back() ;
  }


}
