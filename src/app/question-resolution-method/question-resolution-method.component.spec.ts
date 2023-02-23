import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionResolutionMethodComponent } from './question-resolution-method.component';

describe('QuestionResolutionMethodComponent', () => {
  let component: QuestionResolutionMethodComponent;
  let fixture: ComponentFixture<QuestionResolutionMethodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionResolutionMethodComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestionResolutionMethodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
