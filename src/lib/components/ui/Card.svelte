<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		children: Snippet;
		pressable?: boolean;
		href?: string;
		class?: string;
	}

	let { children, pressable = false, href, class: className = '' }: Props = $props();

	const base = 'rounded-2xl bg-surface p-5 shadow-[0_1px_3px_rgba(0,0,0,0.04)] card-enter';
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
