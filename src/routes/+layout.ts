import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public';
import { createSupabaseLoadClient } from '@supabase/auth-helpers-sveltekit';

export const load = async ({ fetch, data, depends }) => {
	depends('supabase:auth');

	const supabase = createSupabaseLoadClient({
		supabaseUrl: PUBLIC_SUPABASE_URL,
		supabaseKey: PUBLIC_SUPABASE_ANON_KEY,
		event: { fetch },
		serverSession: data.session,
	});

	const { data: { session }} = await supabase.auth.getSession();

	let avatarUrl = null;

	if (session) {
		const { data: url } = await supabase
		.from('profiles')
		.select(`avatar_url`)
		.eq('id', session.user.id)
		.single();


		if (url?.avatar_url) {
			const path = url.avatar_url;
			// todo - this is repearted in AvatarForm. abstract out to single reusable function
			try {
				const { data, error } = await supabase.storage.from('avatars').download(path);
	
				if (error) {
					throw error;
				}
	
				const url = URL.createObjectURL(data);
				avatarUrl = url;
			} catch (error) {
				if (error instanceof Error) {
					console.log(`Error downloading image: ${error.message}`);
				}
			}
		}
	}

	return { supabase, session, avatarUrl };
}
