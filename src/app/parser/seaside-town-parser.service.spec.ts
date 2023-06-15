import { TestBed } from '@angular/core/testing';

import { SeasideTownParserService } from './seaside-town-parser.service';

describe('SeasideTownParserService', () => {
  let service: SeasideTownParserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SeasideTownParserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
