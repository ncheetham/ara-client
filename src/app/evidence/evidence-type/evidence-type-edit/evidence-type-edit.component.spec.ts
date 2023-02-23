import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvidenceTypeEditComponent } from './evidence-type-edit.component';

describe('EvidenceTypeEditComponent', () => {
  let component: EvidenceTypeEditComponent;
  let fixture: ComponentFixture<EvidenceTypeEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvidenceTypeEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EvidenceTypeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
