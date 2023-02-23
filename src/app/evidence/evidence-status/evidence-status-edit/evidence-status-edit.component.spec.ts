import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvidenceStatusEditComponent } from './evidence-status-edit.component';

describe('EvidenceStatusEditComponent', () => {
  let component: EvidenceStatusEditComponent;
  let fixture: ComponentFixture<EvidenceStatusEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvidenceStatusEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EvidenceStatusEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
