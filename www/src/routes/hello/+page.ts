import type { PageLoad } from './$types';

export const load: PageLoad = async(event) => {
  const res = await event.fetch('/api/hello');
  return {
    hello: await res.text()
  }
}
