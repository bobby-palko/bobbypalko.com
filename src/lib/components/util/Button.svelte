<script lang="ts">
	import { ProgressRadial } from '@skeletonlabs/skeleton';
	import type { ButtonStyle } from '$lib/types';

	export let loading = false;
	export let style: ButtonStyle = 'primary';

	let meter = 'stroke-secondary-900';
	let track = 'stroke-secondary-500/30';

	let tailwindStyleClass = buttonStyleToTailWind(style);

	function buttonStyleToTailWind(style: ButtonStyle) {
		if (style === 'primary') {
			return 'variant-filled-primary';
		}
	}
</script>

<button class="btn {tailwindStyleClass}" disabled={loading}>
	{#if loading}
		<ProgressRadial stroke={120} {meter} {track} width={'w-7'} />
	{:else}
		<slot />
	{/if}
</button>

<style>
	/* override disabled button opacity */
	button:disabled {
		opacity: 1 !important;
	}
</style>
