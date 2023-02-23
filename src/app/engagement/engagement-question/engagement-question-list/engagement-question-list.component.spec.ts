import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EngagementQuestionListComponent } from './engagement-question-list.component';

describe('EngagementQuestionListComponent', () => {
  let component: EngagementQuestionListComponent;
  let fixture: ComponentFixture<EngagementQuestionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EngagementQuestionListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EngagementQuestionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
