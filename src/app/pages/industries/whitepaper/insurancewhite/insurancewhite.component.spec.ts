import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsurancewhiteComponent } from './insurancewhite.component';

describe('InsurancewhiteComponent', () => {
  let component: InsurancewhiteComponent;
  let fixture: ComponentFixture<InsurancewhiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InsurancewhiteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InsurancewhiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
