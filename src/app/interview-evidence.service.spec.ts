import { TestBed } from '@angular/core/testing';

import { InterviewEvidenceService } from './interview-evidence.service';

describe('InterviewEvidenceService', () => {
  let service: InterviewEvidenceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InterviewEvidenceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
