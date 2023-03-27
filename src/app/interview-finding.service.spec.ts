import { TestBed } from '@angular/core/testing';

import { InterviewFindingService } from './interview-finding/interview-finding.service';

describe('InterviewFindingService', () => {
  let service: InterviewFindingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InterviewFindingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
