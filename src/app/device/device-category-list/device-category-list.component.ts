import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { DeviceCategory } from 'src/app/device-category';
import { DeviceCategoryService } from 'src/app/device-category.service';

@Component({
  selector: 'app-device-category-list',
  templateUrl: './device-category-list.component.html',
  styleUrls: ['./device-category-list.component.css']
})
export class DeviceCategoryListComponent implements OnInit, OnDestroy  {

  deviceCategories: DeviceCategory[] = [] ;
  displayedColumns: string[] = ['name'] ;

  selectedDeviceCategory: DeviceCategory ; 
  dcChangedSubscription: Subscription ; 

  constructor(private dcService: DeviceCategoryService, private router: Router) {

  }


  ngOnInit(): void {
    
    this.dcService.findAll().subscribe(x => this.deviceCategories = x) ; 

    this.dcChangedSubscription = this.dcService.deviceCategoriesChanged.subscribe(x => {
      this.deviceCategories = x ; 
    }); 

  }
  ngOnDestroy(): void {
    this.dcService.deviceCategoriesChanged.unsubscribe() ; 
  }

  onDelete(id: number) {

    this.dcService.deleteDeviceCategory(id).subscribe();
    
  }


  onSelect(row: DeviceCategory) {
    this.dcService.startedEditing.next(row.deviceCategoryId) ;
  }

  onSubCategory(id: number) {
    this.router.navigate(['viewdevicesubcategories', id]) ; 
  }





}
