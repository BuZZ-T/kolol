import { TestBed } from '@angular/core/testing';

import { ActionParserService } from './action-parser.service';

describe('ActionParserService', () => {
  let service: ActionParserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActionParserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
