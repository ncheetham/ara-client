import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EngagementAddComponent } from './engagement-add.component';

describe('EngagementAddComponent', () => {
  let component: EngagementAddComponent;
  let fixture: ComponentFixture<EngagementAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EngagementAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EngagementAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
