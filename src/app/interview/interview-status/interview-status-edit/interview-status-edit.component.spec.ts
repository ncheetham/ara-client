import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterviewStatusEditComponent } from './interview-status-edit.component';

describe('InterviewStatusEditComponent', () => {
  let component: InterviewStatusEditComponent;
  let fixture: ComponentFixture<InterviewStatusEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InterviewStatusEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InterviewStatusEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
