import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullstackdevelopmentComponent } from './fullstackdevelopment.component';

describe('FullstackdevelopmentComponent', () => {
  let component: FullstackdevelopmentComponent;
  let fixture: ComponentFixture<FullstackdevelopmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FullstackdevelopmentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FullstackdevelopmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
