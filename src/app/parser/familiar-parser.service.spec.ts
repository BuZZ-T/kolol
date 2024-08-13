import { TestBed } from '@angular/core/testing';

import { FamiliarParserService } from './familiar-parser.service';

describe('FamiliarParserService', () => {
  let service: FamiliarParserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FamiliarParserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
