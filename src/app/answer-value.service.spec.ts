import { TestBed } from '@angular/core/testing';

import { AnswerValueService } from './answer-value.service';

describe('AnswerValueService', () => {
  let service: AnswerValueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnswerValueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
