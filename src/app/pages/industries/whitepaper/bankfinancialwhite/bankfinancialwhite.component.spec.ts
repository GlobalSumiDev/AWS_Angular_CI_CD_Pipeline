import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankfinancialwhiteComponent } from './bankfinancialwhite.component';

describe('BankfinancialwhiteComponent', () => {
  let component: BankfinancialwhiteComponent;
  let fixture: ComponentFixture<BankfinancialwhiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BankfinancialwhiteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BankfinancialwhiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
