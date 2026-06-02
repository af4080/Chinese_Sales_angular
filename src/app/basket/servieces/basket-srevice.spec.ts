import { TestBed } from '@angular/core/testing';

import { BasketSrevice } from './basket-srevice';

describe('BasketSrevice', () => {
  let service: BasketSrevice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BasketSrevice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
