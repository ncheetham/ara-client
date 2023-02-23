import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EngagementQuestionComponent } from './engagement-question.component';

describe('EngagementQuestionComponent', () => {
  let component: EngagementQuestionComponent;
  let fixture: ComponentFixture<EngagementQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EngagementQuestionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EngagementQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
