import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolTechListComponent } from './tool-tech-list.component';

describe('ToolTechListComponent', () => {
  let component: ToolTechListComponent;
  let fixture: ComponentFixture<ToolTechListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToolTechListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToolTechListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
