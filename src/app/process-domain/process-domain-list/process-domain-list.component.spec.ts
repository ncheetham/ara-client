import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessDomainListComponent } from './process-domain-list.component';

describe('ProcessDomainListComponent', () => {
  let component: ProcessDomainListComponent;
  let fixture: ComponentFixture<ProcessDomainListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcessDomainListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProcessDomainListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
