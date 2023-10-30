<script lang="ts">
	import { Avatar as SkeletonAvatar } from '@skeletonlabs/skeleton';
	import { SIZE_TO_WIDTH_MAP } from '$lib/constants';
	import type { AvatarSize, WidthValue } from '$lib/types';

	export let src: string | undefined = undefined;
	export let initials: string = '👋🏻';

	export let size: AvatarSize;

	let width: WidthValue = SIZE_TO_WIDTH_MAP[size];
</script>

{#if src}
	<SkeletonAvatar {src} {width} rounded="rounded-full" />
{:else}
	<SkeletonAvatar {initials} {width} rounded="rounded-full" />
{/if}
