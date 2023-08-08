import { TestBed } from '@angular/core/testing';

import { ProductInterceptorService } from './product-interceptor.service';

describe('ProductInterceptorService', () => {
  let service: ProductInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
