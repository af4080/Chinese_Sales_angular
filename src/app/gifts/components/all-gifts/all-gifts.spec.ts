import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllGifts } from './all-gifts';

describe('AllGifts', () => {
  let component: AllGifts;
  let fixture: ComponentFixture<AllGifts>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllGifts]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllGifts);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
