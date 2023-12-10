import { TestBed } from '@angular/core/testing';

import { UseMultiService } from './use-multi.service';

describe('UseMultiService', () => {
  let service: UseMultiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UseMultiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
