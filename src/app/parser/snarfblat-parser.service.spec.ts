import { TestBed } from '@angular/core/testing';

import { SnarfblatParserService } from './snarfblat-parser.service';

describe('SnarfblatParserService', () => {
  let service: SnarfblatParserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SnarfblatParserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
