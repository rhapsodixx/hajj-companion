<script lang="ts">
	import './layout.css';
	import InstallPrompt from '$lib/components/ui/InstallPrompt.svelte';
	import UpdatePrompt from '$lib/components/ui/UpdatePrompt.svelte';

	let { children } = $props();
</script>

<UpdatePrompt />
{@render children()}
<InstallPrompt />
