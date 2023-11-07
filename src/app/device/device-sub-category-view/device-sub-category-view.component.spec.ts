import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceSubCategoryViewComponent } from './device-sub-category-view.component';

describe('DeviceSubCategoryViewComponent', () => {
  let component: DeviceSubCategoryViewComponent;
  let fixture: ComponentFixture<DeviceSubCategoryViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeviceSubCategoryViewComponent]
    });
    fixture = TestBed.createComponent(DeviceSubCategoryViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
