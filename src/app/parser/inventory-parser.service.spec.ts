import { TestBed } from '@angular/core/testing';

import { InventoryParserService } from './inventory-parser.service';

describe('InventoryParserService', () => {
  let service: InventoryParserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InventoryParserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
