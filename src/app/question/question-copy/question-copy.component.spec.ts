import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionCopyComponent } from './question-copy.component';

describe('QuestionCopyComponent', () => {
  let component: QuestionCopyComponent;
  let fixture: ComponentFixture<QuestionCopyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionCopyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestionCopyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
