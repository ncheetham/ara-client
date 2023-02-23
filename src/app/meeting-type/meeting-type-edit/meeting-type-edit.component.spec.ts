import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingTypeEditComponent } from './meeting-type-edit.component';

describe('MeetingTypeEditComponent', () => {
  let component: MeetingTypeEditComponent;
  let fixture: ComponentFixture<MeetingTypeEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeetingTypeEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeetingTypeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
