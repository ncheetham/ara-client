import { TestBed } from '@angular/core/testing';

import { TeamIntervieweeService } from './team-interviewee.service';

describe('TeamIntervieweeService', () => {
  let service: TeamIntervieweeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeamIntervieweeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
