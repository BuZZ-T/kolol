import { TestBed } from '@angular/core/testing';

import { ParseApiService } from './parse-api.service';

describe('ParseApiService', () => {
  let service: ParseApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParseApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
