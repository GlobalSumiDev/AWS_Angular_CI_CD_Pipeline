import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IrmsComponent } from './irms.component';

describe('IrmsComponent', () => {
  let component: IrmsComponent;
  let fixture: ComponentFixture<IrmsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IrmsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IrmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
