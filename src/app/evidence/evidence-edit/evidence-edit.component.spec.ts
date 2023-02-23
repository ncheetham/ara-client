import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvidenceEditComponent } from './evidence-edit.component';

describe('EvidenceEditComponent', () => {
  let component: EvidenceEditComponent;
  let fixture: ComponentFixture<EvidenceEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvidenceEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EvidenceEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
