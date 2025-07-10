import { TestBed } from '@angular/core/testing';

import { ResourceHttp } from './resource-http';

describe('UsersHttp', () => {
  let service: ResourceHttp;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResourceHttp);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
