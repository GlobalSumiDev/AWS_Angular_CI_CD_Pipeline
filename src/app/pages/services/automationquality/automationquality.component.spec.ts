import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutomationqualityComponent } from './automationquality.component';

describe('AutomationqualityComponent', () => {
  let component: AutomationqualityComponent;
  let fixture: ComponentFixture<AutomationqualityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AutomationqualityComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AutomationqualityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
