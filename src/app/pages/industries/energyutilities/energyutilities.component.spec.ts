import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnergyutilitiesComponent } from './energyutilities.component';

describe('EnergyutilitiesComponent', () => {
  let component: EnergyutilitiesComponent;
  let fixture: ComponentFixture<EnergyutilitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnergyutilitiesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EnergyutilitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
