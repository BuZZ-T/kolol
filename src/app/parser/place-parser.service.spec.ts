import { TestBed } from '@angular/core/testing';

import { PlaceParserService } from './place-parser.service';

describe('PlaceParserService', () => {
  let service: PlaceParserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlaceParserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
