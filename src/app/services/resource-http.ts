import { httpResource } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../mocks/data/users';
import { Product } from '../../mocks/data/products';

@Injectable({
  providedIn: 'root',
})
export class ResourceHttp {
  public readonly usersResource = httpResource<Array<User>>(() => 'api/users');
  public readonly productsResource = httpResource<Array<Product>>(
    () => 'api/products'
  );
}
