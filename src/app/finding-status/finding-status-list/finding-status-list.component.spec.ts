import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindingStatusListComponent } from './finding-status-list.component';

describe('FindingStatusListComponent', () => {
  let component: FindingStatusListComponent;
  let fixture: ComponentFixture<FindingStatusListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FindingStatusListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FindingStatusListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
