<script lang="ts">
	import type { Dua } from '$lib/types/dua';
	import ArabicText from '$lib/components/ui/ArabicText.svelte';
	import Card from '$lib/components/ui/Card.svelte';

	interface Props {
		dua: Dua;
		expanded: boolean;
		onToggle: () => void;
		showCategory?: boolean;
		categoryLabel?: string;
	}

	let { dua, expanded, onToggle, showCategory = false, categoryLabel }: Props = $props();
</script>

<Card>
	<button
		class="tap-target min-h-[44px] w-full text-left"
		onclick={onToggle}
		aria-expanded={expanded}
	>
		<div class="flex items-center justify-between gap-3">
			<p class="text-sm font-semibold text-foreground">{dua.title}</p>
			<svg
				width="16"
				height="16"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="1.5"
				stroke-linecap="round"
				stroke-linejoin="round"
				class="shrink-0 text-muted transition-transform duration-200 {expanded ? 'rotate-180' : ''}"
				aria-hidden="true"
			>
				<polyline points="6 9 12 15 18 9" />
			</svg>
		</div>
		{#if showCategory && categoryLabel}
			<p class="mt-0.5 text-[10px] text-muted">{categoryLabel}</p>
		{/if}
		<p class="mt-1 text-xs text-muted">{dua.whenToRead}</p>
	</button>

	{#if expanded}
		<div class="mt-3 space-y-3 border-t border-border pt-3">
			<ArabicText text={dua.arabic} size="lg" />
			<p class="text-xs leading-relaxed text-muted italic">{dua.latin}</p>
			<p class="text-sm leading-relaxed text-foreground">{dua.translation}</p>
		</div>
	{/if}
</Card>
