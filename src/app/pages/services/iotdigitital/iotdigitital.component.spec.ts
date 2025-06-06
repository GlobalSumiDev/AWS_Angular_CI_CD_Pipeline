import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IotdigititalComponent } from './iotdigitital.component';

describe('IotdigititalComponent', () => {
  let component: IotdigititalComponent;
  let fixture: ComponentFixture<IotdigititalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IotdigititalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IotdigititalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
