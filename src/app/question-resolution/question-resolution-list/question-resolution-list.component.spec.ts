import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionResolutionListComponent } from './question-resolution-list.component';

describe('QuestionResolutionListComponent', () => {
  let component: QuestionResolutionListComponent;
  let fixture: ComponentFixture<QuestionResolutionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionResolutionListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestionResolutionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
