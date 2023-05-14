import type { Actions } from './$types';
import { db } from '$lib/db/client';
import { fail } from '@sveltejs/kit';


export const actions = {
  default: async(event) => {
    const ip = event.getClientAddress();
    const formData = await event.request.formData();
    const secret = formData.get('secret');

    try {
      const { error } = await db.from('secrets').insert({
        message: secret,
        ip_addr: ip
      });

      if (error) {
        throw new Error(`Error inserting into secrets table: ${error.message}`);
      }

      return { success: true };
    } catch(e) {
      console.log(e);
      
      return fail(422);
    }
  }
} satisfies Actions;
