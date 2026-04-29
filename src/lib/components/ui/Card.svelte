<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		children: Snippet;
		pressable?: boolean;
		href?: string;
		class?: string;
	}

	let { children, pressable = false, href, class: className = '' }: Props = $props();

	const base = 'rounded-xl border border-border bg-surface p-4';
	const press = $derived(pressable ? 'card-pressable' : '');
</script>

{#if href}
	<a {href} class="{base} {press} block text-foreground no-underline {className}">
		{@render children()}
	</a>
{:else}
	<div class="{base} {press} {className}">
		{@render children()}
	</div>
{/if}
