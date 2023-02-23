import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientEngagementEditComponent } from './client-engagement-edit.component';

describe('ClientEngagementEditComponent', () => {
  let component: ClientEngagementEditComponent;
  let fixture: ComponentFixture<ClientEngagementEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientEngagementEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientEngagementEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
