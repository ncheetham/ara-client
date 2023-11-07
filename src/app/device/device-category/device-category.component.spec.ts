import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceCategoryComponent } from './device-category.component';

describe('DeviceCategoryComponent', () => {
  let component: DeviceCategoryComponent;
  let fixture: ComponentFixture<DeviceCategoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeviceCategoryComponent]
    });
    fixture = TestBed.createComponent(DeviceCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
