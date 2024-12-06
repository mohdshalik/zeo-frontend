import { TestBed } from '@angular/core/testing';

import { CatogaryService } from './catogary.service';

describe('CatogaryService', () => {
  let service: CatogaryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CatogaryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
