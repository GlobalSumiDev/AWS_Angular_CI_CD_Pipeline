import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CareerapplicationComponent } from './CareerapplicationComponent';

describe('CareerapplicationComponent', () => {
  let component: CareerapplicationComponent;
  let fixture: ComponentFixture<CareerapplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CareerapplicationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CareerapplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
