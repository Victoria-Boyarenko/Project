import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductListComponen } from './product-list-componen';

describe('ProductListComponen', () => {
  let component: ProductListComponen;
  let fixture: ComponentFixture<ProductListComponen>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductListComponen],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductListComponen);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
