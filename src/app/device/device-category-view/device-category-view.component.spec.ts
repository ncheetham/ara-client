import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceCategoryViewComponent } from './device-category-view.component';

describe('DeviceCategoryViewComponent', () => {
  let component: DeviceCategoryViewComponent;
  let fixture: ComponentFixture<DeviceCategoryViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeviceCategoryViewComponent]
    });
    fixture = TestBed.createComponent(DeviceCategoryViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
