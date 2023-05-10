import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyIntervieweeComponent } from './survey-interviewee.component';

describe('SurveyIntervieweeComponent', () => {
  let component: SurveyIntervieweeComponent;
  let fixture: ComponentFixture<SurveyIntervieweeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SurveyIntervieweeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SurveyIntervieweeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
