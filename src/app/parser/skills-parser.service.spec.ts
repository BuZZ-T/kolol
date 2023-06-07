import { TestBed } from '@angular/core/testing';

import { SkillsParserService } from './skills-parser.service';

describe('SkillsParserService', () => {
  let service: SkillsParserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SkillsParserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
