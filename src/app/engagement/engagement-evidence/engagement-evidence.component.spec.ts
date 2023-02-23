import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EngagementEvidenceComponent } from './engagement-evidence.component';

describe('EngagementEvidenceComponent', () => {
  let component: EngagementEvidenceComponent;
  let fixture: ComponentFixture<EngagementEvidenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EngagementEvidenceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EngagementEvidenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
