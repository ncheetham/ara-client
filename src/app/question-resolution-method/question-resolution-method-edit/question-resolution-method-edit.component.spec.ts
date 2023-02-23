import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionResolutionMethodEditComponent } from './question-resolution-method-edit.component';

describe('QuestionResolutionMethodEditComponent', () => {
  let component: QuestionResolutionMethodEditComponent;
  let fixture: ComponentFixture<QuestionResolutionMethodEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionResolutionMethodEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestionResolutionMethodEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
