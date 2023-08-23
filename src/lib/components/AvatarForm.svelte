<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { SupabaseClient } from '@supabase/supabase-js';

	import Avatar from './util/Avatar.svelte';

	export let url: string;
	export let supabase: SupabaseClient;

	let avatarUrl: string | null = null;
	let uploading = false;
	let files: FileList;

	const dispatch = createEventDispatcher();

	const downloadImage = async (path: string) => {
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
	};

	const uploadAvatar = async () => {
		try {
			uploading = true;

			if (!files || !files.length) {
				throw new Error('You must select an image to upload.');
			}

			const file = files[0];
			const fileExtension = file.name.split('.').pop();
			const filePath = `${Math.random()}.${fileExtension}`;

			const { error } = await supabase.storage.from('avatars').upload(filePath, file);

			if (error) {
				throw error;
			}

			url = filePath;
			setTimeout(() => {
				dispatch('upload');
			}, 100);
		} catch (error) {
			if (error instanceof Error) {
				// TODO make this not a browser alert
				alert(error.message);
			}
		} finally {
			uploading = false;
		}
	};

	$: if (url) downloadImage(url);
</script>

<div class="justify-self-center">
	{#if avatarUrl}
		<Avatar src={avatarUrl} size="large" />
	{:else}
		<Avatar size="large" />
	{/if}
	<input type="hidden" name="avatarUrl" value={url} />
	<div>
		<label class="chip variant-filled-secondary w-full my-4">
			{uploading ? 'Uploading...' : 'Upload'}
			<input
				style="visibility: hidden; position: absolute;"
				type="file"
				id="single"
				accept="image/*"
				bind:files
				on:change={uploadAvatar}
				disabled={uploading}
			/>
		</label>
	</div>
</div>
