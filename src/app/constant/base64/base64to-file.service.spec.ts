import { TestBed } from '@angular/core/testing';

import { Base64toFileService } from './base64to-file.service';

describe('Base64toFileService', () => {
  let service: Base64toFileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Base64toFileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
