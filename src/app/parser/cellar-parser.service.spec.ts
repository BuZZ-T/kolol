import { TestBed } from '@angular/core/testing';

import { CellarParserService } from './cellar-parser.service';

describe('CellarParserService', () => {
  let service: CellarParserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CellarParserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
