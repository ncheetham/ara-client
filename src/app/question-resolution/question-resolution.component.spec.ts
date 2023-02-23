import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionResolutionComponent } from './question-resolution.component';

describe('QuestionResolutionComponent', () => {
  let component: QuestionResolutionComponent;
  let fixture: ComponentFixture<QuestionResolutionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionResolutionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestionResolutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
