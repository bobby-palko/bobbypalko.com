<script lang="ts">
	import EmailAuth from '$lib/components/auth/EmailAuth.svelte';

	export let data;
</script>

<svelte:head>
	<title>Login</title>
</svelte:head>

<div class="row flex-center flex">
	<div>
		<EmailAuth
			redirectTo={`${data.url}/auth/callback`}
			supabaseClient={data.supabase}
			authView="sign_in"
		/>
	</div>
</div>
