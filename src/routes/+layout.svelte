<script lang="ts">
	import { onMount } from 'svelte';
	import { invalidate } from '$app/navigation';
	// This contains the bulk of Skeletons required styles:
	//! NOTE: this will be renamed skeleton.css in the v2.x release.
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	// Finally, your application's global stylesheet (sometimes labeled 'app.css')
	import '../app.postcss';
	import {
		AppBar,
		AppShell,
		Drawer,
		drawerStore,
		LightSwitch,
		Toast
	} from '@skeletonlabs/skeleton';
	import Hamburger from '$lib/components/Hamburger.svelte';
	import Navigation from '$lib/components/Navigation.svelte';

	export let data;
	let { supabase, session } = data;
	$: ({ supabase, session } = data);

	onMount(() => {
		const { data } = supabase.auth.onAuthStateChange((event, _session) => {
			if (_session?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => data.subscription.unsubscribe();
	});

	let year = new Date().getFullYear();

	function openDrawer(): void {
		drawerStore.open();
	}
</script>

<svelte:head>
	<title>Hi! I'm Bobby</title>
</svelte:head>

<Drawer>
	<Navigation />
</Drawer>

<Toast />

<AppShell slotSidebarLeft="w-0 md:w-52 bg-surface-500/10" slotFooter="text-center">
	<svelte:fragment slot="header">
		<AppBar>
			<svelte:fragment slot="lead">
				<Hamburger clickHandler={openDrawer} />
				<span class="text-4xl">Bobby!</span>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<LightSwitch width="w-16" height="h-8" />
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<svelte:fragment slot="sidebarLeft">
		<Navigation />
	</svelte:fragment>
	<div class="container p-10 mx-auto">
		<slot />
	</div>
	<svelte:fragment slot="footer">
		Made with lots of ☕️ by Bobby Palko © {year}
	</svelte:fragment>
</AppShell>
