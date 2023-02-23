import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterviewEditComponent } from './interview-edit.component';

describe('InterviewEditComponent', () => {
  let component: InterviewEditComponent;
  let fixture: ComponentFixture<InterviewEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InterviewEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InterviewEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
