import { TestBed } from '@angular/core/testing';

import { SurveyQuestionService } from './survey-question.service';

describe('SurveyQuestionService', () => {
  let service: SurveyQuestionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SurveyQuestionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
