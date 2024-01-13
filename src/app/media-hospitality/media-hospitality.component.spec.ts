import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaHospitalityComponent } from './media-hospitality.component';

describe('MediaHospitalityComponent', () => {
  let component: MediaHospitalityComponent;
  let fixture: ComponentFixture<MediaHospitalityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MediaHospitalityComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MediaHospitalityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
