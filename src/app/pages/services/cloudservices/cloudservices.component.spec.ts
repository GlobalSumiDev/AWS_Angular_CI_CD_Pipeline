import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CloudservicesComponent } from './cloudservices.component';

describe('CloudservicesComponent', () => {
  let component: CloudservicesComponent;
  let fixture: ComponentFixture<CloudservicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CloudservicesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CloudservicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
