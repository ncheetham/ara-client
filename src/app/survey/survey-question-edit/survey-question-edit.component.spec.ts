import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyQuestionEditComponent } from './survey-question-edit.component';

describe('SurveyQuestionEditComponent', () => {
  let component: SurveyQuestionEditComponent;
  let fixture: ComponentFixture<SurveyQuestionEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SurveyQuestionEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SurveyQuestionEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
