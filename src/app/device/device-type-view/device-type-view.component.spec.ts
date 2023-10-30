import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceTypeViewComponent } from './device-type-view.component';

describe('DeviceTypeViewComponent', () => {
  let component: DeviceTypeViewComponent;
  let fixture: ComponentFixture<DeviceTypeViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeviceTypeViewComponent]
    });
    fixture = TestBed.createComponent(DeviceTypeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
