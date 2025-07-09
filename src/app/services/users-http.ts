import { httpResource } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../mocks/data/users';

@Injectable({
  providedIn: 'root',
})
export class UsersHttp {
  public readonly usersResource = httpResource<Array<User>>(() => 'api/users');
}
