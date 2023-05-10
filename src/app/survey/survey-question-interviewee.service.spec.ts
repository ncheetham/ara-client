import { TestBed } from '@angular/core/testing';

import { SurveyQuestionIntervieweeService } from './survey-question-interviewee.service';

describe('SurveyQuestionIntervieweeService', () => {
  let service: SurveyQuestionIntervieweeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SurveyQuestionIntervieweeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
