import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyCopyListComponent } from './survey-copy-list.component';

describe('SurveyCopyListComponent', () => {
  let component: SurveyCopyListComponent;
  let fixture: ComponentFixture<SurveyCopyListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SurveyCopyListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SurveyCopyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
