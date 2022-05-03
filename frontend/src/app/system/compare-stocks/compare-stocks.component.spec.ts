import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompareStocksComponent } from './compare-stocks.component';

describe('CompareStocksComponent', () => {
  let component: CompareStocksComponent;
  let fixture: ComponentFixture<CompareStocksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompareStocksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompareStocksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
