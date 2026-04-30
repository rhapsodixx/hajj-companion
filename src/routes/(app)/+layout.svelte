<script lang="ts">
	import BottomNav from '$lib/components/ui/BottomNav.svelte';

	let { children } = $props();
</script>

<div class="pb-nav mx-auto max-w-120">
	{@render children()}
</div>

<BottomNav />
