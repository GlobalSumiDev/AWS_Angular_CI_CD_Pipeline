import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthcarewhiteComponent } from './healthcarewhite.component';

describe('HealthcarewhiteComponent', () => {
  let component: HealthcarewhiteComponent;
  let fixture: ComponentFixture<HealthcarewhiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HealthcarewhiteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HealthcarewhiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
