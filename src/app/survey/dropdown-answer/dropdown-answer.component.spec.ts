import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownAnswerComponent } from './dropdown-answer.component';

describe('DropdownAnswerComponent', () => {
  let component: DropdownAnswerComponent;
  let fixture: ComponentFixture<DropdownAnswerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DropdownAnswerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DropdownAnswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
