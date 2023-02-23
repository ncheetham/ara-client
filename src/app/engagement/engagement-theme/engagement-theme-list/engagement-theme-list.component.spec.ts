import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EngagementThemeListComponent } from './engagement-theme-list.component';

describe('EngagementThemeListComponent', () => {
  let component: EngagementThemeListComponent;
  let fixture: ComponentFixture<EngagementThemeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EngagementThemeListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EngagementThemeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
