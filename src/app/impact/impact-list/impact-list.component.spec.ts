import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpactListComponent } from './impact-list.component';

describe('ImpactListComponent', () => {
  let component: ImpactListComponent;
  let fixture: ComponentFixture<ImpactListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImpactListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImpactListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
