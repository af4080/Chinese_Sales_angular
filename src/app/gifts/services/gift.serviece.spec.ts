import { TestBed } from '@angular/core/testing';

import { GiftServiece } from './gift-serviece';

describe('GiftServiece', () => {
  let service: GiftServiece;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GiftServiece);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
