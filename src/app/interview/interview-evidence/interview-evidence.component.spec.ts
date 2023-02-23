import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterviewEvidenceComponent } from './interview-evidence.component';

describe('InterviewEvidenceComponent', () => {
  let component: InterviewEvidenceComponent;
  let fixture: ComponentFixture<InterviewEvidenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InterviewEvidenceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InterviewEvidenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
