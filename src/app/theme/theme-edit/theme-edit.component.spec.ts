import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemeEditComponent } from './theme-edit.component';

describe('ThemeEditComponent', () => {
  let component: ThemeEditComponent;
  let fixture: ComponentFixture<ThemeEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThemeEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThemeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
