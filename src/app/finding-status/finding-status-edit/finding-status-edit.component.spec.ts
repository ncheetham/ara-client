import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindingStatusEditComponent } from './finding-status-edit.component';

describe('FindingStatusEditComponent', () => {
  let component: FindingStatusEditComponent;
  let fixture: ComponentFixture<FindingStatusEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FindingStatusEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FindingStatusEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
