import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobilityhospitalityComponent } from './mobilityhospitality.component';

describe('MobilityhospitalityComponent', () => {
  let component: MobilityhospitalityComponent;
  let fixture: ComponentFixture<MobilityhospitalityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MobilityhospitalityComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MobilityhospitalityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
