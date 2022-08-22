import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../util/supabaseClient';

function handler(req: NextApiRequest, res: NextApiResponse) {
  supabase.auth.api.setAuthCookie(req, res);
}

export default handler;
