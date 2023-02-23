import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientEngagementComponent } from './client-engagement.component';

describe('ClientEngagementComponent', () => {
  let component: ClientEngagementComponent;
  let fixture: ComponentFixture<ClientEngagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientEngagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientEngagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
