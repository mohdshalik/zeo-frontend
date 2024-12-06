import { TestBed } from '@angular/core/testing';

import { BrachRegistrationService } from './brach-registration.service';

describe('BrachRegistrationService', () => {
  let service: BrachRegistrationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BrachRegistrationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
