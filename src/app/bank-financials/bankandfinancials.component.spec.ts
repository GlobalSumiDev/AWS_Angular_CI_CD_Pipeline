import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankandfinancialsComponent } from './bankandfinancials.component';

describe('BankandfinancialsComponent', () => {
  let component: BankandfinancialsComponent;
  let fixture: ComponentFixture<BankandfinancialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BankandfinancialsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BankandfinancialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
