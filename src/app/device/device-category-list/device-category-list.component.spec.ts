import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceCategoryListComponent } from './DeviceCategoryListComponent';

describe('DeviceCategoryListComponent', () => {
  let component: DeviceCategoryListComponent;
  let fixture: ComponentFixture<DeviceCategoryListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeviceCategoryListComponent]
    });
    fixture = TestBed.createComponent(DeviceCategoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
