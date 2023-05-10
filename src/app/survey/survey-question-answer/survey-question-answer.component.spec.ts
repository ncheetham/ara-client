import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyQuestionAnswerComponent } from './survey-question-answer.component';

describe('SurveyQuestionAnswerComponent', () => {
  let component: SurveyQuestionAnswerComponent;
  let fixture: ComponentFixture<SurveyQuestionAnswerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SurveyQuestionAnswerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SurveyQuestionAnswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
