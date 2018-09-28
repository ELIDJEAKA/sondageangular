import { TestBed, inject } from '@angular/core/testing';

import { SondageService } from './sondage.service';

describe('SondageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SondageService]
    });
  });

  it('should be created', inject([SondageService], (service: SondageService) => {
    expect(service).toBeTruthy();
  }));
});
