import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolTechComponent } from './tool-tech.component';

describe('ToolTechComponent', () => {
  let component: ToolTechComponent;
  let fixture: ComponentFixture<ToolTechComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToolTechComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToolTechComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
