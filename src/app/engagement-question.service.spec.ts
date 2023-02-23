import { TestBed } from '@angular/core/testing';

import { EngagementQuestionService } from './engagement-question.service';

describe('EngagementQuestionService', () => {
  let service: EngagementQuestionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EngagementQuestionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
