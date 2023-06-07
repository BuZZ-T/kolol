import { TestBed } from '@angular/core/testing';

import { ResultsParserService } from './results-parser.service';

describe('ResultsParserService', () => {
  let service: ResultsParserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResultsParserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
