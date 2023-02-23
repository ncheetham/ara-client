import { TestBed } from '@angular/core/testing';

import { ToolTechService } from './tool-tech.service';

describe('ToolTechService', () => {
  let service: ToolTechService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToolTechService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
