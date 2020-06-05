import { TestBed } from '@angular/core/testing';

import { DebtReliefService } from './debt-relief.service';

describe('DebtReliefService', () => {
  let service: DebtReliefService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DebtReliefService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
