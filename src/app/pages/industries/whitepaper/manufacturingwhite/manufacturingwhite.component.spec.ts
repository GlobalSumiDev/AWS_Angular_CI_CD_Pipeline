import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManufacturingwhiteComponent } from './manufacturingwhite.component';

describe('ManufacturingwhiteComponent', () => {
  let component: ManufacturingwhiteComponent;
  let fixture: ComponentFixture<ManufacturingwhiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManufacturingwhiteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManufacturingwhiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
