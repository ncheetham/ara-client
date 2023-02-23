import { TestBed } from '@angular/core/testing';

import { InterviewObservationService } from './interview-observation.service';

describe('InterviewObservationService', () => {
  let service: InterviewObservationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InterviewObservationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
