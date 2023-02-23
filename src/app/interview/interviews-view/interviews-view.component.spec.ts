import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterviewsViewComponent } from './interviews-view.component';

describe('InterviewViewComponent', () => {
  let component: InterviewsViewComponent;
  let fixture: ComponentFixture<InterviewsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InterviewsViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InterviewsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
