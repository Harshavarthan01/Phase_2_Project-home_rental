import { TestBed } from '@angular/core/testing';

import { TempserviceService } from './tempservice.service';

describe('TempserviceService', () => {
  let service: TempserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TempserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
