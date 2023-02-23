import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterviewCopyListComponent } from './interview-copy-list.component';

describe('InterviewCopyListComponent', () => {
  let component: InterviewCopyListComponent;
  let fixture: ComponentFixture<InterviewCopyListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InterviewCopyListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InterviewCopyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
