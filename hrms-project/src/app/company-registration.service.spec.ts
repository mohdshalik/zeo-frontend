import { TestBed } from '@angular/core/testing';

import { CompanyRegistrationService } from './company-registration.service';

describe('CompanyRegistrationService', () => {
  let service: CompanyRegistrationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompanyRegistrationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
