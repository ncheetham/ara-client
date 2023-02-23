import { TestBed } from '@angular/core/testing';

import { QuestionResolutionService } from './question-resolution.service';

describe('QuestionResolutionService', () => {
  let service: QuestionResolutionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuestionResolutionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
