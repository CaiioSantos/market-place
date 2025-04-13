import { TestBed } from '@angular/core/testing';

import { CupomDescontoService } from './cupom-desconto.service';

describe('CupomDescontoService', () => {
  let service: CupomDescontoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CupomDescontoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
