import { delay, http, HttpResponse } from 'msw';
import users from './data/users';
import { setupWorker } from 'msw/browser';

export const handlers = [
  http.get('api/users', async () => {
    await delay(1500);
    return HttpResponse.json(users);
  }),
];

export const worker = setupWorker(...handlers);
