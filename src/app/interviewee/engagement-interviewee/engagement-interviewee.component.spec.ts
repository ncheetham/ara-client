import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EngagementIntervieweeComponent } from './engagement-interviewee.component';

describe('EngagementIntervieweeComponent', () => {
  let component: EngagementIntervieweeComponent;
  let fixture: ComponentFixture<EngagementIntervieweeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EngagementIntervieweeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EngagementIntervieweeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
