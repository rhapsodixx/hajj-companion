<script lang="ts">
	import { CaretRight } from 'phosphor-svelte';
	import type { Dua } from '$lib/types/dua';
	import Card from '$lib/components/ui/Card.svelte';

	interface Props {
		dua: Dua;
		showCategory?: boolean;
		categoryLabel?: string;
	}

	let { dua, showCategory = false, categoryLabel }: Props = $props();
</script>

<Card pressable href="/dua/{dua.id}" class="group">
	<div class="flex w-full items-center justify-between gap-3">
		<div class="min-w-0 flex-1">
			<p
				class="text-sm font-bold text-foreground transition-colors duration-300 group-hover:text-brand"
			>
				{dua.title}
			</p>
			{#if showCategory && categoryLabel}
				<p class="mt-1 text-[10px] font-bold tracking-widest text-brand uppercase">
					{categoryLabel}
				</p>
			{/if}
			<p class="mt-1 line-clamp-2 text-xs leading-relaxed text-muted">
				{dua.whenToRead}
			</p>
		</div>
		<CaretRight
			size={20}
			weight="bold"
			class="shrink-0 text-muted/30 transition-all duration-300 group-hover:text-brand"
			aria-hidden="true"
		/>
	</div>
</Card>
