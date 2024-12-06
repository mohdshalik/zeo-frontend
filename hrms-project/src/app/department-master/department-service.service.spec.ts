import { TestBed } from '@angular/core/testing';

import { DepartmentServiceService } from './department-service.service';

describe('DepartmentServiceService', () => {
  let service: DepartmentServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DepartmentServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
