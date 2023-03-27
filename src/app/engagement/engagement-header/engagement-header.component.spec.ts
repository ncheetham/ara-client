import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EngagementHeaderComponent } from './engagement-header.component';

describe('EngagementHeaderComponent', () => {
  let component: EngagementHeaderComponent;
  let fixture: ComponentFixture<EngagementHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EngagementHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EngagementHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
