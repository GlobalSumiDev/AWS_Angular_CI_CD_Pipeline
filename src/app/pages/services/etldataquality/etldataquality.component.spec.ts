import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtldataqualityComponent } from './etldataquality.component';

describe('EtldataqualityComponent', () => {
  let component: EtldataqualityComponent;
  let fixture: ComponentFixture<EtldataqualityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EtldataqualityComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EtldataqualityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
