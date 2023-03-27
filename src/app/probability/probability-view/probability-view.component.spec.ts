import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProbabilityViewComponent } from './probability-view.component';

describe('ProbabilityViewComponent', () => {
  let component: ProbabilityViewComponent;
  let fixture: ComponentFixture<ProbabilityViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProbabilityViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProbabilityViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
