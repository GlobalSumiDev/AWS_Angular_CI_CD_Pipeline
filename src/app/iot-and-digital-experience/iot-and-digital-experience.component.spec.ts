import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IotAndDigitalExperienceComponent } from './iot-and-digital-experience.component';

describe('IotAndDigitalExperienceComponent', () => {
  let component: IotAndDigitalExperienceComponent;
  let fixture: ComponentFixture<IotAndDigitalExperienceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IotAndDigitalExperienceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IotAndDigitalExperienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
