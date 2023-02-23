import { TestBed } from '@angular/core/testing';

import { FindingStatusService } from './finding-status.service';

describe('FindingStatusService', () => {
  let service: FindingStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FindingStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
