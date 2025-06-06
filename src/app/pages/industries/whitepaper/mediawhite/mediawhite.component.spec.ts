import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediawhiteComponent } from './mediawhite.component';

describe('MediawhiteComponent', () => {
  let component: MediawhiteComponent;
  let fixture: ComponentFixture<MediawhiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MediawhiteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MediawhiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
