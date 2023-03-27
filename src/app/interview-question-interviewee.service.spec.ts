import { TestBed } from '@angular/core/testing';

import { InterviewQuestionIntervieweeService } from './interview-question-interviewee.service';

describe('InterviewQuestionIntervieweeService', () => {
  let service: InterviewQuestionIntervieweeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InterviewQuestionIntervieweeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
