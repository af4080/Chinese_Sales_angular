import { TestBed } from '@angular/core/testing';

import { Doner } from './doner.service';

describe('Doner', () => {
  let service: Doner;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Doner);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
