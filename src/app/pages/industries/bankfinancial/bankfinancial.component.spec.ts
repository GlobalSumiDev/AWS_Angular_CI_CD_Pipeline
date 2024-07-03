import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankfinancialComponent } from './bankfinancial.component';

describe('BankfinancialComponent', () => {
  let component: BankfinancialComponent;
  let fixture: ComponentFixture<BankfinancialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BankfinancialComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BankfinancialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
