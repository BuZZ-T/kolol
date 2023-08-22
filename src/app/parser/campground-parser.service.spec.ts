import { TestBed } from '@angular/core/testing';

import { CampgroundParserService } from './campground-parser.service';

describe('CampgroundParserService', () => {
  let service: CampgroundParserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CampgroundParserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
