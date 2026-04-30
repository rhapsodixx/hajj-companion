<script lang="ts">
	import type { Snippet } from 'svelte';
	import { PHASE_COLORS } from '$lib/data/itinerary';

	interface Props {
		phase: string;
		children: Snippet;
		label?: Snippet;
		class?: string;
	}

	let { phase, children, label, class: className = '' }: Props = $props();

	const accentColor = $derived(PHASE_COLORS[phase] ?? 'var(--color-brand)');
</script>

<div
	class="card-enter relative overflow-hidden rounded-2xl bg-surface p-5 shadow-[0_1px_3px_rgba(0,0,0,0.04)] {className}"
	style="border-left: 3px solid {accentColor};"
>
	<div class="relative z-10">
		{#if label}
			<div class="mb-2">
				{@render label()}
			</div>
		{/if}
		{@render children()}
	</div>
</div>
