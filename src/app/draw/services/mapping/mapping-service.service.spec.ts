import { TestBed } from '@angular/core/testing';

import { MappingService } from './mapping.service';

describe('MappingServiceService', () => {
  let service: MappingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MappingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
