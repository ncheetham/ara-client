import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EngagementThemeEditComponent } from './engagement-theme-edit.component';

describe('EngagementThemeEditComponent', () => {
  let component: EngagementThemeEditComponent;
  let fixture: ComponentFixture<EngagementThemeEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EngagementThemeEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EngagementThemeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
