<script lang="ts">
	import BottomNav from '$lib/components/ui/BottomNav.svelte';

	let { children } = $props();
</script>

<div class="pb-nav">
	{@render children()}
</div>

<BottomNav />
