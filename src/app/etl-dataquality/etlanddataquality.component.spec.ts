import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtlanddataqualityComponent } from './etlanddataquality.component';

describe('EtlanddataqualityComponent', () => {
  let component: EtlanddataqualityComponent;
  let fixture: ComponentFixture<EtlanddataqualityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EtlanddataqualityComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EtlanddataqualityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
