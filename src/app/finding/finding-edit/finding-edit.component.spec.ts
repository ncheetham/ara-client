import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindingEditComponent } from './finding-edit.component';

describe('FindingEditComponent', () => {
  let component: FindingEditComponent;
  let fixture: ComponentFixture<FindingEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FindingEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FindingEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
