import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolTechEditComponent } from './tool-tech-edit.component';

describe('ToolTechEditComponent', () => {
  let component: ToolTechEditComponent;
  let fixture: ComponentFixture<ToolTechEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToolTechEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToolTechEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
