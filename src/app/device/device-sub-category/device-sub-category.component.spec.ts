import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceSubCategoryComponent } from './device-sub-category.component';

describe('DeviceSubCategoryComponent', () => {
  let component: DeviceSubCategoryComponent;
  let fixture: ComponentFixture<DeviceSubCategoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeviceSubCategoryComponent]
    });
    fixture = TestBed.createComponent(DeviceSubCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
