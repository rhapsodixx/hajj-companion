<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		phase: string;
		children: Snippet;
		label?: Snippet;
		class?: string;
	}

	let { phase, children, label, class: className = '' }: Props = $props();

	const phaseColors: Record<string, string> = {
		arrival: 'var(--color-phase-arrival)',
		madinah: 'var(--color-phase-madinah)',
		'madinah-to-makkah': 'var(--color-phase-madinah-to-makkah)',
		makkah: 'var(--color-phase-makkah)',
		'ash-shishah': 'var(--color-phase-ash-shishah)',
		rukun: 'var(--color-phase-rukun)',
		'post-hajj': 'var(--color-phase-post-hajj)',
		departure: 'var(--color-phase-departure)'
	};

	const accentColor = $derived(phaseColors[phase] ?? 'var(--color-brand)');
</script>

<div
	class="relative overflow-hidden rounded-2xl p-5 {className}"
	style="background: {accentColor};"
>
	<!-- Subtle grain texture via box-shadow layering -->
	<div
		class="absolute inset-0 rounded-2xl opacity-10"
		style="background: repeating-linear-gradient(45deg, #ffffff 0, #ffffff 1px, transparent 0, transparent 50%); background-size: 4px 4px;"
	></div>

	<div class="relative z-10">
		{#if label}
			<div class="mb-2">
				{@render label()}
			</div>
		{/if}
		{@render children()}
	</div>
</div>
