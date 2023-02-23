import { TestBed } from '@angular/core/testing';

import { EvidenceStatusService } from './evidence-status.service';

describe('EvidenceStatusService', () => {
  let service: EvidenceStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EvidenceStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
