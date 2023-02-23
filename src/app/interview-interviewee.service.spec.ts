import { TestBed } from '@angular/core/testing';

import { InterviewIntervieweeService } from './interview-interviewee.service';

describe('InterviewIntervieweeService', () => {
  let service: InterviewIntervieweeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InterviewIntervieweeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
