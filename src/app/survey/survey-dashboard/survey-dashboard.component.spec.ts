import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyDashboardComponent } from './survey-dashboard.component';

describe('SurveyDashboardComponent', () => {
  let component: SurveyDashboardComponent;
  let fixture: ComponentFixture<SurveyDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SurveyDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SurveyDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
