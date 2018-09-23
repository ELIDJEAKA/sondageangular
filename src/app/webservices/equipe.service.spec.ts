import { TestBed, inject } from '@angular/core/testing';

import { EquipeService } from './equipe.service';

describe('EquipeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EquipeService]
    });
  });

  it('should be created', inject([EquipeService], (service: EquipeService) => {
    expect(service).toBeTruthy();
  }));
});
