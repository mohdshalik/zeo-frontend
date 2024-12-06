import { TestBed } from '@angular/core/testing';

import { BranchServiceService } from './branch-service.service';

describe('BranchServiceService', () => {
  let service: BranchServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BranchServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
