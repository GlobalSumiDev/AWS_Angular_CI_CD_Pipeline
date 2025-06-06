import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedtechComponent } from './medtech.component';

describe('MedtechComponent', () => {
  let component: MedtechComponent;
  let fixture: ComponentFixture<MedtechComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MedtechComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MedtechComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
