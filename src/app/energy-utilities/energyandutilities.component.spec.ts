import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnergyandutilitiesComponent } from './energyandutilities.component';

describe('EnergyandutilitiesComponent', () => {
  let component: EnergyandutilitiesComponent;
  let fixture: ComponentFixture<EnergyandutilitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnergyandutilitiesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EnergyandutilitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
