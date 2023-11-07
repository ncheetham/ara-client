import { Location } from '@angular/common';
import { Component, Input, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DeviceSubCategoryService } from 'src/app/device-sub-category.service';
import { DeviceSubCategory } from 'src/app/device-subcatgory';

@Component({
  selector: 'app-device-sub-category',
  templateUrl: './device-sub-category.component.html',
  styleUrls: ['./device-sub-category.component.css']
})
export class DeviceSubCategoryComponent {

  constructor(private dscService: DeviceSubCategoryService, private location: Location) {}

  selectedSubCategory: DeviceSubCategory ; 
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
