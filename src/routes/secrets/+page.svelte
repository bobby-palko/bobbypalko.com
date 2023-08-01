<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import { toastStore } from '@skeletonlabs/skeleton';
	import type { ToastSettings } from '@skeletonlabs/skeleton';

	const t: ToastSettings = {
		message: 'Thank you for sharing ❤️'
	};

	let buttonContent = 'Send';
</script>

<div class="card">
	<h1 class="card-header text-3xl">Send an Anonymous Message</h1>
	<p class="p-4">
		Want to get something off your chest? Or maybe you just want to say hi! Either way, here you can
		send me whatever words you wish - without me knowing who you are.
	</p>
</div>

<div class="card variant-ringed-secondary p-4 mt-4">
	<form
		method="post"
		class="flex flex-col items-center gap-2"
		use:enhance={({ form, data, action, cancel, submitter }) => {
			// `form` is the `<form>` element
			// `data` is its `FormData` object
			// `action` is the URL to which the form is posted
			// `cancel()` will prevent the submission
			// `submitter` is the `HTMLElement` that caused the form to be submitted
			return async ({ result, update }) => {
				// `result` is an `ActionResult` object
				// `update` is a function which triggers the logic that would be triggered if this callback wasn't set
				if (result.type === 'success') {
					toastStore.trigger(t);
				}
				applyAction(result);
			};
		}}
	>
		<label class="label self-stretch" for="secret">
			<span class="pl-4">Speak freely</span>
			<textarea
				class="textarea"
				rows="4"
				placeholder="Your secret is safe with me."
				name="secret"
				id="secret"
			/>
		</label>
		<button type="submit" class="btn variant-filled-primary">{buttonContent}</button>
	</form>
</div>
