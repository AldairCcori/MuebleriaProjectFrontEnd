import { TestBed } from '@angular/core/testing';

import { ProducGuardService } from './produc-guard.service';

describe('ProducGuardService', () => {
  let service: ProducGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProducGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
