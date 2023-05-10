import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyConductComponent } from './survey-conduct.component';

describe('SurveyConductComponent', () => {
  let component: SurveyConductComponent;
  let fixture: ComponentFixture<SurveyConductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SurveyConductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SurveyConductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
