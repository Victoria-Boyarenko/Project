import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Fandoms } from './fandoms';

describe('Fandoms', () => {
  let component: Fandoms;
  let fixture: ComponentFixture<Fandoms>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Fandoms],
    }).compileComponents();

    fixture = TestBed.createComponent(Fandoms);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
