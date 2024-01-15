import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobilityHospitalityComponent } from './mobility-hospitality.component';

describe('MediaHospitalityComponent', () => {
  let component: MobilityHospitalityComponent;
  let fixture: ComponentFixture<MobilityHospitalityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MobilityHospitalityComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MobilityHospitalityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
