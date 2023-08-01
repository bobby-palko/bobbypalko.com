<script lang="ts">
	import type { SupabaseClient } from '@supabase/supabase-js';
	import type { RedirectTo, ViewType } from '$lib/types';

	export let authView: ViewType = 'sign_in';
	export let email = '';
	export let password = '';
	export let supabaseClient: SupabaseClient;
	export let redirectTo: RedirectTo;

	let verifyPassword = '';
	let passwordErrors: string[] = [];
	let message = '';
	let error = '';
	let loading = false;
	$: buttonContent = authView == 'sign_in' ? 'Log in' : 'Join!';

	/**
	 * validates password meets some requirements
	 * TODO: more client side validation (min length, complexity, etc)
	 */
	function validatePassword(password: string, verifyPassword: string): string[] {
		const passwordErrors = [];
		// passwords don't match
		if (password !== verifyPassword) {
			passwordErrors.push('Passwords must match!');
		}
		// password is more than 72 characters - this is a supabase limitation that i should try to overcome
		if (password.length > 72) {
			passwordErrors.push('Passwords must be less than 72 characters!');
		}
		// at least 8 characters minimum
		if (password.length < 8) {
			passwordErrors.push('Passwords must be greater than 8 characters!');
		}
		return passwordErrors;
	}

	async function handleSubmit() {
		loading = true;
		error = '';
		passwordErrors = [];
		message = '';

		switch (authView) {
			case 'sign_in':
				const { error: signInError } = await supabaseClient.auth.signInWithPassword({
					email,
					password
				});
				if (signInError) {
					error = signInError.message;
				}
				loading = false;
				break;
			case 'sign_up':
				passwordErrors = validatePassword(password, verifyPassword);

				if (passwordErrors.length) {
					break;
				}
				const options: { emailRedirectTo: RedirectTo; data?: object } = {
					emailRedirectTo: redirectTo
				};

				const {
					data: { user: signUpUser, session: signUpSession },
					error: signUpError
				} = await supabaseClient.auth.signUp({
					email,
					password,
					options
				});

				if (signUpError) {
					error = signUpError.message;
				}

				// no session because email confirmation is still needed
				else if (signUpUser && !signUpSession) {
					message = 'Thanks for signing up! Please confirm your email to continue.';
				}
				break;
		}
	}
</script>

<form
	method="post"
	on:submit|preventDefault={handleSubmit}
	class="flex flex-col items-center gap-2"
>
	<label class="label self-stretch">
		<span class="pl-4">Email</span>
		<input class="input" type="text" placeholder="me@bobbypalko.com" bind:value={email} required />
	</label>
	<label class="label self-stretch">
		<span class="pl-4">Password</span>
		<input
			class="input {passwordErrors.length && 'input-error'}"
			type="password"
			bind:value={password}
			required
		/>
	</label>
	{#if passwordErrors.length}
		<ul>
			{#each passwordErrors as passwordError}
				<li class="text-error-300">{passwordError}</li>
			{/each}
		</ul>
	{/if}
	<label class="label self-stretch {authView === 'sign_in' && 'hidden'}">
		<span class="pl-4">Verify Password</span>
		<input
			class="input {passwordErrors.length && 'input-error'}"
			type="password"
			bind:value={verifyPassword}
			required={authView === 'sign_up' || null}
		/>
	</label>
	<button type="submit" class="btn variant-filled-primary">{buttonContent}</button>
	<div class="flex flex-col items-center gap-2">
		{#if authView === 'sign_up'}
			<a
				class="anchor"
				href="#sign_in"
				on:click={(e) => {
					e.preventDefault();
					authView = 'sign_in';
				}}>Already a member? Log in</a
			>
		{:else}
			<a
				class="anchor"
				href="#sign_up"
				on:click={(e) => {
					e.preventDefault();
					authView = 'sign_up';
				}}>Not a member? Join now!</a
			>
		{/if}
	</div>
	{#if message}
		<p>{message}</p>
	{/if}
	{#if error}
		<p>{error}</p>
	{/if}
</form>
