import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobilitywhiteComponent } from './mobilitywhite.component';

describe('MobilitywhiteComponent', () => {
  let component: MobilitywhiteComponent;
  let fixture: ComponentFixture<MobilitywhiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MobilitywhiteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MobilitywhiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
