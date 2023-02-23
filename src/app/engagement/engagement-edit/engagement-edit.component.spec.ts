import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EngagementEditComponent } from './engagement-edit.component';

describe('EngagementEditComponent', () => {
  let component: EngagementEditComponent;
  let fixture: ComponentFixture<EngagementEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EngagementEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EngagementEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
