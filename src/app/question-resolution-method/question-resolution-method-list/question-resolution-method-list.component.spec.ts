import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionResolutionMethodListComponent } from './question-resolution-method-list.component';

describe('QuestionResolutionMethodListComponent', () => {
  let component: QuestionResolutionMethodListComponent;
  let fixture: ComponentFixture<QuestionResolutionMethodListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionResolutionMethodListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestionResolutionMethodListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
