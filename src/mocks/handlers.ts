import { delay, http, HttpResponse } from 'msw';
import { setupWorker } from 'msw/browser';

/** Various data types to test */
// import users from './data/users';
import { products } from './data/products';

export const handlers = [
  http.get('api/users', async () => {
    await delay(1500);
    return HttpResponse.json(products);
  }),
];

export const worker = setupWorker(...handlers);
