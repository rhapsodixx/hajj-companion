<script lang="ts">
	import { duaLibrary } from '$lib/data/dua';
	import Card from '$lib/components/ui/Card.svelte';
	import ArabicText from '$lib/components/ui/ArabicText.svelte';

	type DuaCategory = 'niat' | 'tawaf' | 'sai' | 'wukuf' | 'jumrah' | 'safar' | 'masjid' | 'umum';

	const CATEGORY_ORDER: DuaCategory[] = ['niat', 'masjid', 'tawaf', 'sai', 'wukuf', 'jumrah', 'safar', 'umum'];

	const CATEGORY_LABELS: Record<DuaCategory, string> = {
		niat: 'Niat & Talbiyah',
		masjid: 'Masjid',
		tawaf: 'Tawaf',
		sai: "Sa'i",
		wukuf: 'Wukuf & Arafah',
		jumrah: 'Lontar Jumrah',
		safar: 'Perjalanan',
		umum: 'Umum'
	};

	type DuaGroup = { category: DuaCategory; duas: typeof duaLibrary };
	const groups: DuaGroup[] = [];
	for (const cat of CATEGORY_ORDER) {
		const duas = duaLibrary.filter((d) => d.category === cat);
		if (duas.length > 0) groups.push({ category: cat, duas });
	}

	let expanded: string | null = $state(null);

	function toggle(id: string) {
		expanded = expanded === id ? null : id;
	}
</script>

<svelte:head><title>Kumpulan Doa — Patuna Coklat-B</title></svelte:head>

<div class="mx-auto max-w-120 px-4 pt-safe pb-6">
	<!-- Header -->
	<div class="sticky top-0 z-10 bg-background pt-4 pb-3">
		<h1 class="text-xl font-semibold">Kumpulan Doa</h1>
		<p class="text-xs text-muted mt-0.5">{duaLibrary.length} doa · Arab, latin, terjemah</p>
	</div>

	<!-- Category groups -->
	<div class="space-y-6">
		{#each groups as group}
			<div>
				<p class="text-[10px] font-bold text-muted uppercase tracking-widest mb-2">
					{CATEGORY_LABELS[group.category]}
				</p>
				<div class="space-y-2">
					{#each group.duas as dua}
						<Card>
							<button
								class="w-full text-left"
								onclick={() => toggle(dua.id)}
								aria-expanded={expanded === dua.id}
							>
								<div class="flex items-center justify-between gap-3">
									<p class="text-sm font-semibold text-(--color-brand)">{dua.title}</p>
									<svg
										width="16" height="16" viewBox="0 0 24 24" fill="none"
										stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"
										class="shrink-0 text-muted transition-transform duration-200 {expanded === dua.id ? 'rotate-180' : ''}"
										aria-hidden="true"
									>
										<polyline points="6 9 12 15 18 9"/>
									</svg>
								</div>
								<p class="mt-1 text-xs text-muted">{dua.whenToRead}</p>
							</button>

							{#if expanded === dua.id}
								<div class="mt-3 pt-3 border-t border-border space-y-3">
									<ArabicText text={dua.arabic} size="lg" />
									<p class="text-xs text-muted italic leading-relaxed">{dua.latin}</p>
									<p class="text-sm text-foreground leading-relaxed">{dua.translation}</p>
								</div>
							{/if}
						</Card>
					{/each}
				</div>
			</div>
		{/each}
	</div>
</div>
