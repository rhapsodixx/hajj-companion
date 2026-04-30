<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		children: Snippet;
		variant?: 'primary' | 'secondary' | 'ghost';
		size?: 'sm' | 'md' | 'lg';
		href?: string;
		disabled?: boolean;
		type?: 'button' | 'submit' | 'reset';
		onclick?: () => void;
		class?: string;
	}

	let {
		children,
		variant = 'primary',
		size = 'md',
		href,
		disabled = false,
		type = 'button',
		onclick,
		class: className = ''
	}: Props = $props();

	const base =
		'inline-flex items-center justify-center font-medium rounded-pill tap-target transition-all duration-100 ease-out active:scale-[0.98] select-none';

	const variants = {
		primary:
			'bg-(--color-brand) text-white shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white/50',
		secondary: 'bg-surface text-foreground border border-border hover:bg-(--color-brand-light)',
		ghost: 'text-(--color-brand) bg-transparent hover:bg-(--color-accent-light)'
	};

	const sizes = {
		sm: 'px-3 text-sm gap-1.5',
		md: 'px-5 text-sm gap-2',
		lg: 'px-6 text-base gap-2'
	};

	const disabledClass = $derived(disabled ? 'opacity-40 pointer-events-none' : '');
</script>

{#if href}
	<a
		{href}
		class="{base} {variants[variant]} {sizes[size]} {disabledClass} {className}"
		aria-disabled={disabled}
	>
		{@render children()}
	</a>
{:else}
	<button
		{type}
		{disabled}
		{onclick}
		class="{base} {variants[variant]} {sizes[size]} {disabledClass} {className}"
	>
		{@render children()}
	</button>
{/if}
