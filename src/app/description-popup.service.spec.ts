import { TestBed } from '@angular/core/testing';

import { DescriptionPopupService } from './description-popup.service';

describe('DescriptionPopupService', () => {
  let service: DescriptionPopupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DescriptionPopupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
