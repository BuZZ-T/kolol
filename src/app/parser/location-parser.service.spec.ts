import { TestBed } from '@angular/core/testing';

import { LocationParserService } from './location-parser.service';

describe('LocationParserService', () => {
  let service: LocationParserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocationParserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
