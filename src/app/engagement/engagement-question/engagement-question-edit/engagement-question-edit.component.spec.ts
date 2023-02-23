import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EngagementQuestionEditComponent } from './engagement-question-edit.component';

describe('EngagementQuestionEditComponent', () => {
  let component: EngagementQuestionEditComponent;
  let fixture: ComponentFixture<EngagementQuestionEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EngagementQuestionEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EngagementQuestionEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
