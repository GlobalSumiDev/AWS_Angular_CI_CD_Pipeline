import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchbloxComponent } from './searchblox.component';

describe('SearchbloxComponent', () => {
  let component: SearchbloxComponent;
  let fixture: ComponentFixture<SearchbloxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchbloxComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SearchbloxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
