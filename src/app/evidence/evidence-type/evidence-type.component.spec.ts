import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvidenceTypeComponent } from './evidence-type.component';

describe('EvidenceTypeComponent', () => {
  let component: EvidenceTypeComponent;
  let fixture: ComponentFixture<EvidenceTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvidenceTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EvidenceTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
