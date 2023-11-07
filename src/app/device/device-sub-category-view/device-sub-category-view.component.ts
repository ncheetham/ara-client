import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DeviceCategory } from 'src/app/device-category';
import { DeviceCategoryService } from 'src/app/device-category.service';

@Component({
  selector: 'app-device-sub-category-view',
  templateUrl: './device-sub-category-view.component.html',
  styleUrls: ['./device-sub-category-view.component.css']
})
export class DeviceSubCategoryViewComponent implements OnInit, OnDestroy {

  deviceCategory: DeviceCategory ; 

  constructor(private dcService: DeviceCategoryService, private route: ActivatedRoute) {

  }


  ngOnInit(): void {

    // Read the DeviceCategoryId From the parameters
    const id: number = Number(this.route.snapshot.paramMap.get("devicecategoryid")) ; 

    this.dcService.findById(id).subscribe(x => this.deviceCategory = x) ; 



  }
  
  ngOnDestroy(): void {
    
  }

}
