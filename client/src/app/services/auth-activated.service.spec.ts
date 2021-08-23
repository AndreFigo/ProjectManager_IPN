import { TestBed } from '@angular/core/testing';

import { AuthActivatedService } from './auth-activated.service';

describe('AuthActivatedService', () => {
  let service: AuthActivatedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthActivatedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
