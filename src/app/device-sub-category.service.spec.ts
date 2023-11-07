import { TestBed } from '@angular/core/testing';

import { DeviceSubCategoryService } from './device-sub-category.service';

describe('DeviceSubCategoryService', () => {
  let service: DeviceSubCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeviceSubCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
