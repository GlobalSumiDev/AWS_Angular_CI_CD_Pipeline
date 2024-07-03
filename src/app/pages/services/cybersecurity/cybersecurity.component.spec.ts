import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CybersecurityComponent } from './cybersecurity.component';

describe('CybersecurityComponent', () => {
  let component: CybersecurityComponent;
  let fixture: ComponentFixture<CybersecurityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CybersecurityComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CybersecurityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
