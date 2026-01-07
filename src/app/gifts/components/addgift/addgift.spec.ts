import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Addgift } from './addgift';

describe('Addgift', () => {
  let component: Addgift;
  let fixture: ComponentFixture<Addgift>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Addgift]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Addgift);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
