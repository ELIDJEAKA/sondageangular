import { TestBed, inject } from '@angular/core/testing';

import { SimulateurService } from './simulateur.service';

describe('SimulateurService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SimulateurService]
    });
  });

  it('should be created', inject([SimulateurService], (service: SimulateurService) => {
    expect(service).toBeTruthy();
  }));
});
