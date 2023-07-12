<script lang="ts">
    import { drawerStore } from '@skeletonlabs/skeleton';
	import { page } from '$app/stores';

    const home = '/';
    const secrets = '/secrets';
    const truth = '/truth';
    const notHome = '/not-home';

    $: classesActive = (href: string) => (href === $page.url.pathname ? '!variant-filled-primary' : '');
    function closeDrawer() {
        drawerStore.close();
    }
</script>

<nav class="list-nav p-4">
    <ul>
        <li>
            <a href="{home}" class="{classesActive(home)}" on:click={closeDrawer}>
                <span class="badge bg-surface-500">🏡</span>
                <span class="flex-auto">Home</span>
            </a>
        </li>
        <li>
            <a href="{notHome}" class="{classesActive(notHome)}" on:click={closeDrawer}>
                <span class="badge bg-surface-500">💀</span>
                <span class="flex-auto">Not Home</span>
            </a>
        </li>
        <li>
            <a href="{secrets}" class="{classesActive(secrets)}" on:click={closeDrawer}>
                <span class="badge bg-surface-500">🤐</span>
                <span class="flex-auto">Secrets</span>
            </a>
        </li>
        <li>
            <a href="{truth}" class="{classesActive(truth)}" on:click={closeDrawer}>
                <span class="badge bg-surface-500">🔮</span>
                <span class="flex-auto">Truth</span>
            </a>
        </li>
    </ul>
</nav>
