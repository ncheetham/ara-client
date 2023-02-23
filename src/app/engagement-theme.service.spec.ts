import { TestBed } from '@angular/core/testing';

import { EngagementThemeService } from './engagement-theme.service';

describe('EngagementThemeService', () => {
  let service: EngagementThemeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EngagementThemeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
