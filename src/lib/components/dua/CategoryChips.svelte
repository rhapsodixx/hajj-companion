<script lang="ts">
	type DuaCategory = 'niat' | 'tawaf' | 'sai' | 'wukuf' | 'jumrah' | 'safar' | 'masjid' | 'umum';

	interface Props {
		categories: DuaCategory[];
		labels: Record<DuaCategory, string>;
		selected: DuaCategory | null;
		onSelect: (cat: DuaCategory | null) => void;
	}

	let { categories, labels, selected, onSelect }: Props = $props();
</script>

<div class="scrollbar-none mt-2.5 flex gap-2 overflow-x-auto pb-1">
	<button
		onclick={() => onSelect(null)}
		class="tap-target shrink-0 rounded-full px-3 py-1 text-xs font-medium transition-colors {selected ===
		null
			? 'bg-(--color-brand) text-white'
			: 'bg-surface text-muted'}"
		aria-pressed={selected === null}
	>
		Semua
	</button>
	{#each categories as cat (cat)}
		<button
			onclick={() => onSelect(cat)}
			class="tap-target shrink-0 rounded-full px-3 py-1 text-xs font-medium transition-colors {selected ===
			cat
				? 'bg-(--color-brand) text-white'
				: 'bg-surface text-muted'}"
			aria-pressed={selected === cat}
		>
			{labels[cat]}
		</button>
	{/each}
</div>
