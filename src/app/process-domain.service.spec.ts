import { TestBed } from '@angular/core/testing';

import { ProcessDomainService } from './process-domain.service';

describe('ProcessDomainService', () => {
  let service: ProcessDomainService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProcessDomainService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
