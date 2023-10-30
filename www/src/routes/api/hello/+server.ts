import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
  return await fetch(`http://api:3000/`, {
    method: 'GET',
  });
}
