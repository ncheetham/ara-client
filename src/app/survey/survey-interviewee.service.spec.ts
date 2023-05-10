import { TestBed } from '@angular/core/testing';

import { SurveyIntervieweeService } from './survey-interviewee.service';

describe('SurveyIntervieweeService', () => {
  let service: SurveyIntervieweeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SurveyIntervieweeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
