import { TestBed } from '@angular/core/testing';

import { CouncilParserService } from './council-parser.service';

describe('CouncilParserService', () => {
  let service: CouncilParserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CouncilParserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
