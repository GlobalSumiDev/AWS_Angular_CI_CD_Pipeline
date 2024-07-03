import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullstackdevComponent } from './fullstackdev.component';

describe('FullstackdevComponent', () => {
  let component: FullstackdevComponent;
  let fixture: ComponentFixture<FullstackdevComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FullstackdevComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FullstackdevComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
