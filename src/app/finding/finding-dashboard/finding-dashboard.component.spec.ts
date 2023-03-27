import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindingDashboardComponent } from './finding-dashboard.component';

describe('FindingDashboardComponent', () => {
  let component: FindingDashboardComponent;
  let fixture: ComponentFixture<FindingDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FindingDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FindingDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
