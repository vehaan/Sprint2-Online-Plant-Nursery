import { TestBed } from '@angular/core/testing';

import { PlanterServiceService } from './planter-service.service';

describe('PlanterServiceService', () => {
  let service: PlanterServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlanterServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
