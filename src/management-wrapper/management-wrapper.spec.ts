import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementWrapper } from './management-wrapper';

describe('ManagementWrapper', () => {
  let component: ManagementWrapper;
  let fixture: ComponentFixture<ManagementWrapper>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagementWrapper]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagementWrapper);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
