import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObservationViewComponent } from './observation-view.component';

describe('ObservationViewComponent', () => {
  let component: ObservationViewComponent;
  let fixture: ComponentFixture<ObservationViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObservationViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ObservationViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
