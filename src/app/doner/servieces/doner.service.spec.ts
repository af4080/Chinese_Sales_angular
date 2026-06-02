import { TestBed } from '@angular/core/testing';

import { DonerService } from './doner.service';

describe('Doner', () => {
  let service: DonerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DonerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
