import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObservationAddComponent } from './observation-add.component';

describe('ObservationAddComponent', () => {
  let component: ObservationAddComponent;
  let fixture: ComponentFixture<ObservationAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObservationAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ObservationAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
