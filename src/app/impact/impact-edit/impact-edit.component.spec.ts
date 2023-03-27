import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpactEditComponent } from './impact-edit.component';

describe('ImpactEditComponent', () => {
  let component: ImpactEditComponent;
  let fixture: ComponentFixture<ImpactEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImpactEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImpactEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
