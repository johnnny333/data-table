import { TestBed } from '@angular/core/testing';

import { UsersHttp } from './users-http';

describe('UsersHttp', () => {
  let service: UsersHttp;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsersHttp);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
