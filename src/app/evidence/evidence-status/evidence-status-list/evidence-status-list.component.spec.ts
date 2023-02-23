import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvidenceStatusListComponent } from './evidence-status-list.component';

describe('EvidenceStatusListComponent', () => {
  let component: EvidenceStatusListComponent;
  let fixture: ComponentFixture<EvidenceStatusListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvidenceStatusListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EvidenceStatusListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
