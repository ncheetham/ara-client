import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvidenceDashboardComponent } from './evidence-dashboard.component';

describe('EvidenceDashboardComponent', () => {
  let component: EvidenceDashboardComponent;
  let fixture: ComponentFixture<EvidenceDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvidenceDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EvidenceDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
