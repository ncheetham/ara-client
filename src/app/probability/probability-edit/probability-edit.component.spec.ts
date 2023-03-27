import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProbabilityEditComponent } from './probability-edit.component';

describe('ProbabilityEditComponent', () => {
  let component: ProbabilityEditComponent;
  let fixture: ComponentFixture<ProbabilityEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProbabilityEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProbabilityEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
