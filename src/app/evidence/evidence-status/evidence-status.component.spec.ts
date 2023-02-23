import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvidenceStatusComponent } from './evidence-status.component';

describe('EvidenceStatusComponent', () => {
  let component: EvidenceStatusComponent;
  let fixture: ComponentFixture<EvidenceStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvidenceStatusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EvidenceStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
