import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntervieweeStatusComponent } from './interviewee-status.component';

describe('IntervieweeStatusComponent', () => {
  let component: IntervieweeStatusComponent;
  let fixture: ComponentFixture<IntervieweeStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntervieweeStatusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IntervieweeStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
