import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DeviceSubCategoryService } from 'src/app/device-sub-category.service';
import { DeviceSubCategory } from 'src/app/device-subcatgory';

@Component({
  selector: 'app-device-sub-category-list',
  templateUrl: './device-sub-category-list.component.html',
  styleUrls: ['./device-sub-category-list.component.css']
})
export class DeviceSubCategoryListComponent implements OnInit, OnDestroy {

  @Input({required: true}) deviceCategoryId: number ; 
  deviceSubCategories: DeviceSubCategory[] = [] ; 
  dscChanged: Subscription ; 
  selectedSubDeviceCategory: DeviceSubCategory ; 
  displayedColumns: string[] = ['name'] ; 

  constructor(private dscService: DeviceSubCategoryService) {

  }

  ngOnInit(): void {

    // Find all the Device Sub categories for the Device Category.
    this.dscChanged = this.dscService.subCategoryChanged.subscribe(x =>
      {
        this.dscService.findByDeviceCategoryId(this.deviceCategoryId).subscribe(x => this.deviceSubCategories = x) ;
      });

      this.dscService.findByDeviceCategoryId(this.deviceCategoryId).subscribe(x => this.deviceSubCategories = x) ;

  }
  ngOnDestroy(): void {
    // Remove Subscriptions 
    this.dscChanged.unsubscribe() ; 
  }


  onSelect(aDsc: DeviceSubCategory) {
    this.dscService.subCategorySelected.next(aDsc.deviceSubCategoryId) ; 
  }
  
  onDelete(dscId: number) {
    this.dscService.deleteSubCatgory(dscId).subscribe() ; 
  }


}
