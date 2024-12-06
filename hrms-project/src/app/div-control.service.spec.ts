import { TestBed } from '@angular/core/testing';

import { DivControlService } from './div-control.service';

describe('DivControlService', () => {
  let service: DivControlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DivControlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
