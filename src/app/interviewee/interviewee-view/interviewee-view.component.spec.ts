import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntervieweeViewComponent } from './interviewee-view.component';

describe('IntervieweeViewComponent', () => {
  let component: IntervieweeViewComponent;
  let fixture: ComponentFixture<IntervieweeViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntervieweeViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IntervieweeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
