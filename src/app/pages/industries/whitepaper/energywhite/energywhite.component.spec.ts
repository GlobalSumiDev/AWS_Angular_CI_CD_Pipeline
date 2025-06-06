import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnergywhiteComponent } from './energywhite.component';

describe('EnergywhiteComponent', () => {
  let component: EnergywhiteComponent;
  let fixture: ComponentFixture<EnergywhiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnergywhiteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EnergywhiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
