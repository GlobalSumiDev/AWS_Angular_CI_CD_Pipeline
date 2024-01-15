import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediacommunicationComponent } from './mediacommunication.component';

describe('MediacommunicationComponent', () => {
  let component: MediacommunicationComponent;
  let fixture: ComponentFixture<MediacommunicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MediacommunicationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MediacommunicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
