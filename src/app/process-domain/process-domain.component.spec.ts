import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessDomainComponent } from './process-domain.component';

describe('ProcessDomainComponent', () => {
  let component: ProcessDomainComponent;
  let fixture: ComponentFixture<ProcessDomainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcessDomainComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProcessDomainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
