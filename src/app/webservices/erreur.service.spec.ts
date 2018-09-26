import { TestBed, inject } from '@angular/core/testing';

import { ErreurService } from './erreur.service';

describe('ErreurService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ErreurService]
    });
  });

  it('should be created', inject([ErreurService], (service: ErreurService) => {
    expect(service).toBeTruthy();
  }));
});
