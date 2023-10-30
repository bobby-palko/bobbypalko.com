<script lang="ts">
	import type { SupabaseClient, Provider } from '@supabase/supabase-js';
	import type { RedirectTo } from '$lib/types';
	import { onMount } from 'svelte';

	export let supabaseClient: SupabaseClient;
	export let view = 'sign_in';
	export let redirectTo: RedirectTo = undefined;

	onMount(() => {
		const { data: authListener } = supabaseClient.auth.onAuthStateChange((event) => {
			if (event === 'PASSWORD_RECOVERY') {
				view = 'update_password';
			} else if (event === 'USER_UPDATED') {
				view = 'sign_in';
			}
		});

		() => authListener.subscription.unsubscribe();
	});
</script>

<div />
