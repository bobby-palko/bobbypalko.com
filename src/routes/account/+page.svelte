<script lang="ts">
	import { enhance, type SubmitFunction } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import AvatarForm from '$lib/components/AvatarForm.svelte';
	import Button from '$lib/components/util/Button.svelte';

	export let data;
	export let form;

	let { session, profile, supabase } = data;
	$: ({ session, profile } = data);

	let profileForm: HTMLFormElement;
	let updateButtonLoading = false;
	let signOutButtonLoading = false;
	let fullName: string = profile?.full_name ?? '';
	let username: string = profile?.username ?? '';
	let avatarUrl: string = profile?.avatar_url ?? '';

	const handleSubmit: SubmitFunction = () => {
		updateButtonLoading = true;
		return async () => {
			updateButtonLoading = false;
			invalidateAll();
		};
	};

	const handleSignOut: SubmitFunction = () => {
		signOutButtonLoading = true;
		return async ({ update }) => {
			signOutButtonLoading = false;
			update();
		};
	};
</script>

<div class="md:flex flex-col items-center gap-4">
	<form
		class="grid md:grid-cols-2 gap-8"
		method="post"
		action="?/update"
		use:enhance={handleSubmit}
		bind:this={profileForm}
	>
		<AvatarForm
			{supabase}
			bind:url={avatarUrl}
			on:upload={() => {
				profileForm.requestSubmit();
			}}
		/>
		<div class="flex flex-col items-center gap-2">
			<div class="self-stretch">
				<label class="label">
					<span class="pl-4">Email</span>
					<input class="input" type="email" value={session.user.email} disabled readonly />
				</label>
			</div>
			<div class="self-stretch">
				<label class="label">
					<span>Full Name</span>
					<input
						class="input"
						id="fullName"
						name="fullName"
						type="text"
						value={form?.fullName ?? fullName}
					/>
				</label>
			</div>

			<div class="self-stretch">
				<label class="label">
					<span>Username</span>
					<input class="input" name="username" type="text" value={form?.username ?? username} />
				</label>
			</div>

			<div class="self-center">
				<Button loading={updateButtonLoading} style="primary">Update</Button>
			</div>
		</div>
	</form>

	<form
		class="sm:p-4 md:p-0 flex flex-col items-center gap-2"
		method="post"
		action="?/signout"
		use:enhance={handleSignOut}
	>
		<div>
			<!-- TODO make into Button component -->
			<button class="btn variant-filled-tertiary" disabled={signOutButtonLoading}>Sign Out</button>
		</div>
	</form>
</div>
