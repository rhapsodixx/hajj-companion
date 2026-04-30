<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		children: Snippet;
		pressable?: boolean;
		href?: string;
		class?: string;
	}

	let { children, pressable = false, href, class: className = '' }: Props = $props();

	const base = 'rounded-lg bg-surface p-5 shadow-level-1 card-enter';
	const press = $derived(pressable ? 'card-pressable' : '');
</script>

{#if href}
	<a {href} class="{base} {press} tap-target block text-foreground no-underline {className}">
		{@render children()}
	</a>
{:else}
	<div class="{base} {press} {className}">
		{@render children()}
	</div>
{/if}
