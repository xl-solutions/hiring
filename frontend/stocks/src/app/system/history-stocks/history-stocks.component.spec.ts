import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryStocksComponent } from './history-stocks.component';

describe('HistoryStocksComponent', () => {
  let component: HistoryStocksComponent;
  let fixture: ComponentFixture<HistoryStocksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoryStocksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryStocksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
