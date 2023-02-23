import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvidenceTypeListComponent } from './evidence-type-list.component';

describe('EvidenceTypeListComponent', () => {
  let component: EvidenceTypeListComponent;
  let fixture: ComponentFixture<EvidenceTypeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvidenceTypeListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EvidenceTypeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
