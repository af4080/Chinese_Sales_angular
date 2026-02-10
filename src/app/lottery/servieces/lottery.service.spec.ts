import { TestBed } from '@angular/core/testing';

import { LotteryService } from './lottery.serviece';

describe('LotteryService', () => {
  let service: LotteryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LotteryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
