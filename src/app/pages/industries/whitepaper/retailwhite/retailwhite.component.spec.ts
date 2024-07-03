import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetailwhiteComponent } from './retailwhite.component';

describe('RetailwhiteComponent', () => {
  let component: RetailwhiteComponent;
  let fixture: ComponentFixture<RetailwhiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RetailwhiteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RetailwhiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
