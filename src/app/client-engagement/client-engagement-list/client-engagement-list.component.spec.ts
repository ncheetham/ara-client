import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientEngagementListComponent } from './client-engagement-list.component';

describe('ClientEngagementListComponent', () => {
  let component: ClientEngagementListComponent;
  let fixture: ComponentFixture<ClientEngagementListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientEngagementListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientEngagementListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
