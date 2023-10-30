import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterviewIntervieweeAddExistingComponent } from './interview-interviewee-add-existing.component';

describe('InterviewIntervieweeAddExistingComponent', () => {
  let component: InterviewIntervieweeAddExistingComponent;
  let fixture: ComponentFixture<InterviewIntervieweeAddExistingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InterviewIntervieweeAddExistingComponent]
    });
    fixture = TestBed.createComponent(InterviewIntervieweeAddExistingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
