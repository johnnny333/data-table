import { delay, http, HttpResponse } from 'msw';
import { setupWorker } from 'msw/browser';

import { products } from './data/products';
import { users } from './data/users';

export const handlers = [
  http.get('api/users', async () => {
    await delay(1500);
    return HttpResponse.json(users);
  }),

  http.get('api/products', async () => {
    await delay(1500);
    return HttpResponse.json(products);
  }),
];

export const worker = setupWorker(...handlers);
