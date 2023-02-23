import { TestBed } from '@angular/core/testing';

import { EngagementEvidenceService } from './engagement-evidence.service';

describe('EngagementEvidenceService', () => {
  let service: EngagementEvidenceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EngagementEvidenceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
