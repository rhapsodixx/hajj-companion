<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import InstallPrompt from '$lib/components/ui/InstallPrompt.svelte';
	import UpdatePrompt from '$lib/components/ui/UpdatePrompt.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<link rel="apple-touch-icon" href="/icons/icon-192.png" />
</svelte:head>

<UpdatePrompt />
{@render children()}
<InstallPrompt />
