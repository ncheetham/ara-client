import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntervieweeAllViewComponent } from './interviewee-all-view.component';

describe('IntervieweeAllViewComponent', () => {
  let component: IntervieweeAllViewComponent;
  let fixture: ComponentFixture<IntervieweeAllViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntervieweeAllViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IntervieweeAllViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
