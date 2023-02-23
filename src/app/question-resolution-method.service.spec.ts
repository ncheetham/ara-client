import { TestBed } from '@angular/core/testing';

import { QuestionResolutionMethodService } from './question-resolution-method.service';

describe('QuestionResolutionMethodService', () => {
  let service: QuestionResolutionMethodService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuestionResolutionMethodService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
