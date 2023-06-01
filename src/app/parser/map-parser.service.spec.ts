import { TestBed } from '@angular/core/testing';

import { MapParserService } from './map-parser.service';

describe('MapParserService', () => {
  let service: MapParserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MapParserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
