import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionResolutionEditComponent } from './question-resolution-edit.component';

describe('QuestionResolutionEditComponent', () => {
  let component: QuestionResolutionEditComponent;
  let fixture: ComponentFixture<QuestionResolutionEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionResolutionEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestionResolutionEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
