import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntervieweeEditComponent } from './interviewee-edit.component';

describe('IntervieweeEditComponent', () => {
  let component: IntervieweeEditComponent;
  let fixture: ComponentFixture<IntervieweeEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntervieweeEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IntervieweeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
