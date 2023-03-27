import { TestBed } from '@angular/core/testing';

import { SurveyQuestionCategoryService } from './survey-question-category.service';

describe('SurveyQuestionCategoryService', () => {
  let service: SurveyQuestionCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SurveyQuestionCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
