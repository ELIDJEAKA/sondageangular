import { TestBed, inject } from '@angular/core/testing';

import { PartisanService } from './partisan.service';

describe('PartisanService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PartisanService]
    });
  });

  it('should be created', inject([PartisanService], (service: PartisanService) => {
    expect(service).toBeTruthy();
  }));
});
