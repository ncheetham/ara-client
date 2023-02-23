import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EngagementViewComponent } from './engagement-view.component';

describe('EngagementViewComponent', () => {
  let component: EngagementViewComponent;
  let fixture: ComponentFixture<EngagementViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EngagementViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EngagementViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
