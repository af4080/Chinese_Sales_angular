import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageDonor } from './manage-donor';

describe('ManageDonor', () => {
  let component: ManageDonor;
  let fixture: ComponentFixture<ManageDonor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageDonor]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageDonor);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
