import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AimlComponent } from './aiml.component';

describe('AimlComponent', () => {
  let component: AimlComponent;
  let fixture: ComponentFixture<AimlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AimlComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AimlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
