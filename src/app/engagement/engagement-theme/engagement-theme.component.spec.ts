import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EngagementThemeComponent } from './engagement-theme.component';

describe('EngagementThemeComponent', () => {
  let component: EngagementThemeComponent;
  let fixture: ComponentFixture<EngagementThemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EngagementThemeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EngagementThemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
