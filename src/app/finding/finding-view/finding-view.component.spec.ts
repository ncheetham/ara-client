import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindingViewComponent } from './finding-view.component';

describe('FindingViewComponent', () => {
  let component: FindingViewComponent;
  let fixture: ComponentFixture<FindingViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FindingViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FindingViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
