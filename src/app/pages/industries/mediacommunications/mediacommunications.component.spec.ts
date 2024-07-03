import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediacommunicationsComponent } from './mediacommunications.component';

describe('MediacommunicationsComponent', () => {
  let component: MediacommunicationsComponent;
  let fixture: ComponentFixture<MediacommunicationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MediacommunicationsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MediacommunicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
