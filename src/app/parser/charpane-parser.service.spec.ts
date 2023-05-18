import { TestBed } from '@angular/core/testing';

import { CharpaneParserService } from './charpane-parser.service';

describe('CharpaneParserService', () => {
  let service: CharpaneParserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CharpaneParserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
