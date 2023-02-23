import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessDomainEditComponent } from './process-domain-edit.component';

describe('ProcessDomainEditComponent', () => {
  let component: ProcessDomainEditComponent;
  let fixture: ComponentFixture<ProcessDomainEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcessDomainEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProcessDomainEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
