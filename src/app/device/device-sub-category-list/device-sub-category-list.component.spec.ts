import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceSubCategoryListComponent } from './device-sub-category-list.component';

describe('DeviceSubCategoryListComponent', () => {
  let component: DeviceSubCategoryListComponent;
  let fixture: ComponentFixture<DeviceSubCategoryListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeviceSubCategoryListComponent]
    });
    fixture = TestBed.createComponent(DeviceSubCategoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
