<script lang="ts">
	import { duaLibrary } from '$lib/data/dua';
	import Card from '$lib/components/ui/Card.svelte';
	import ArabicText from '$lib/components/ui/ArabicText.svelte';

	type DuaCategory = 'niat' | 'tawaf' | 'sai' | 'wukuf' | 'jumrah' | 'safar' | 'masjid' | 'umum';

	const CATEGORY_ORDER: DuaCategory[] = [
		'niat',
		'masjid',
		'tawaf',
		'sai',
		'wukuf',
		'jumrah',
		'safar',
		'umum'
	];

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
	let query = $state('');
	let selectedCategory: DuaCategory | null = $state(null);

	function normalize(s: string) {
		return s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
	}

	function matchQuery(dua: (typeof duaLibrary)[0]) {
		if (!query) return true;
		const q = normalize(query);
		return (
			normalize(dua.title).includes(q) ||
			normalize(dua.translation).includes(q) ||
			normalize(dua.whenToRead).includes(q)
		);
	}

	let isFiltering = $derived(query.length > 0 || selectedCategory !== null);

	let filteredFlat = $derived(
		query
			? duaLibrary.filter(matchQuery)
			: selectedCategory
				? duaLibrary.filter((d) => d.category === selectedCategory)
				: []
	);

	let resultCount = $derived(filteredFlat.length);

	function toggle(id: string) {
		expanded = expanded === id ? null : id;
	}

	function selectCategory(cat: DuaCategory | null) {
		selectedCategory = selectedCategory === cat ? null : cat;
		expanded = null;
	}

	function clearSearch() {
		query = '';
	}

	function onSearchInput(e: Event) {
		query = (e.target as HTMLInputElement).value;
		expanded = null;
	}
</script>

<svelte:head><title>Kumpulan Doa — Patuna Coklat-B</title></svelte:head>

<div class="pt-safe mx-auto max-w-120 px-4 pb-6">
	<!-- Sticky header: title + search + chips -->
	<div class="sticky top-0 z-10 bg-background pt-4 pb-2">
		<h1 class="text-xl font-semibold">Kumpulan Doa</h1>

		<!-- Search input -->
		<div class="relative mt-3">
			<svg
				width="16"
				height="16"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2.5"
				stroke-linecap="round"
				stroke-linejoin="round"
				class="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-muted"
				aria-hidden="true"
			>
				<circle cx="11" cy="11" r="8" />
				<line x1="21" y1="21" x2="16.65" y2="16.65" />
			</svg>
			<input
				type="text"
				value={query}
				oninput={onSearchInput}
				placeholder="Cari doa..."
				class="w-full rounded-lg border border-border bg-surface py-2.5 pr-9 pl-9 text-sm text-foreground placeholder:text-muted/60 focus:border-(--color-brand) focus:outline-none"
				aria-label="Cari doa"
			/>
			{#if query}
				<button
					onclick={clearSearch}
					class="tap-target absolute top-1/2 right-2 -translate-y-1/2 rounded-full p-1 text-muted"
					aria-label="Hapus pencarian"
				>
					<svg
						width="14"
						height="14"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2.5"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<line x1="18" y1="6" x2="6" y2="18" />
						<line x1="6" y1="6" x2="18" y2="18" />
					</svg>
				</button>
			{/if}
		</div>

		<!-- Category chips -->
		<div class="scrollbar-none mt-2.5 flex gap-2 overflow-x-auto pb-1">
			<button
				onclick={() => selectCategory(null)}
				class="tap-target shrink-0 rounded-full px-3 py-1 text-xs font-medium transition-colors {selectedCategory ===
				null
					? 'bg-(--color-brand) text-white'
					: 'bg-surface text-muted'}"
				aria-pressed={selectedCategory === null}
			>
				Semua
			</button>
			{#each CATEGORY_ORDER as cat (cat)}
				<button
					onclick={() => selectCategory(cat)}
					class="tap-target shrink-0 rounded-full px-3 py-1 text-xs font-medium transition-colors {selectedCategory ===
					cat
						? 'bg-(--color-brand) text-white'
						: 'bg-surface text-muted'}"
					aria-pressed={selectedCategory === cat}
				>
					{CATEGORY_LABELS[cat]}
				</button>
			{/each}
		</div>

		<!-- Result count or subtitle -->
		<div class="mt-2">
			{#if isFiltering}
				<p class="text-xs text-muted">
					{resultCount > 0
						? `${resultCount} doa ditemukan`
						: 'Doa tidak ditemukan. Coba kata lain.'}
				</p>
			{:else}
				<p class="text-xs text-muted">{duaLibrary.length} doa · Arab, latin, terjemah</p>
			{/if}
		</div>
	</div>

	<!-- Du'a list -->
	{#if isFiltering && resultCount === 0}
		<div class="py-12 text-center">
			<p class="text-sm text-muted">Tidak ada doa yang cocok.</p>
		</div>
	{:else if query}
		<!-- Flat list when searching -->
		<div class="space-y-2">
			{#each filteredFlat as dua (dua.id)}
				<Card>
					<button
						class="w-full text-left"
						onclick={() => toggle(dua.id)}
						aria-expanded={expanded === dua.id}
					>
						<div class="flex items-center justify-between gap-3">
							<p class="text-sm font-semibold text-(--color-brand)">{dua.title}</p>
							<svg
								width="16"
								height="16"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2.5"
								stroke-linecap="round"
								stroke-linejoin="round"
								class="shrink-0 text-muted transition-transform duration-200 {expanded === dua.id
									? 'rotate-180'
									: ''}"
								aria-hidden="true"
							>
								<polyline points="6 9 12 15 18 9" />
							</svg>
						</div>
						<p class="mt-0.5 text-[10px] text-muted">{CATEGORY_LABELS[dua.category]}</p>
						<p class="mt-1 text-xs text-muted">{dua.whenToRead}</p>
					</button>

					{#if expanded === dua.id}
						<div class="mt-3 space-y-3 border-t border-border pt-3">
							<ArabicText text={dua.arabic} size="lg" />
							<p class="text-xs leading-relaxed text-muted italic">{dua.latin}</p>
							<p class="text-sm leading-relaxed text-foreground">{dua.translation}</p>
						</div>
					{/if}
				</Card>
			{/each}
		</div>
	{:else if selectedCategory}
		<!-- Single category (no group header needed) -->
		<div class="space-y-2">
			{#each filteredFlat as dua (dua.id)}
				<Card>
					<button
						class="w-full text-left"
						onclick={() => toggle(dua.id)}
						aria-expanded={expanded === dua.id}
					>
						<div class="flex items-center justify-between gap-3">
							<p class="text-sm font-semibold text-(--color-brand)">{dua.title}</p>
							<svg
								width="16"
								height="16"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2.5"
								stroke-linecap="round"
								stroke-linejoin="round"
								class="shrink-0 text-muted transition-transform duration-200 {expanded === dua.id
									? 'rotate-180'
									: ''}"
								aria-hidden="true"
							>
								<polyline points="6 9 12 15 18 9" />
							</svg>
						</div>
						<p class="mt-1 text-xs text-muted">{dua.whenToRead}</p>
					</button>

					{#if expanded === dua.id}
						<div class="mt-3 space-y-3 border-t border-border pt-3">
							<ArabicText text={dua.arabic} size="lg" />
							<p class="text-xs leading-relaxed text-muted italic">{dua.latin}</p>
							<p class="text-sm leading-relaxed text-foreground">{dua.translation}</p>
						</div>
					{/if}
				</Card>
			{/each}
		</div>
	{:else}
		<!-- Default grouped view -->
		<div class="space-y-6">
			{#each groups as group (group.category)}
				<div>
					<p class="mb-2 text-[10px] font-bold tracking-widest text-muted uppercase">
						{CATEGORY_LABELS[group.category]}
					</p>
					<div class="space-y-2">
						{#each group.duas as dua (dua.id)}
							<Card>
								<button
									class="w-full text-left"
									onclick={() => toggle(dua.id)}
									aria-expanded={expanded === dua.id}
								>
									<div class="flex items-center justify-between gap-3">
										<p class="text-sm font-semibold text-(--color-brand)">{dua.title}</p>
										<svg
											width="16"
											height="16"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											stroke-width="2.5"
											stroke-linecap="round"
											stroke-linejoin="round"
											class="shrink-0 text-muted transition-transform duration-200 {expanded ===
											dua.id
												? 'rotate-180'
												: ''}"
											aria-hidden="true"
										>
											<polyline points="6 9 12 15 18 9" />
										</svg>
									</div>
									<p class="mt-1 text-xs text-muted">{dua.whenToRead}</p>
								</button>

								{#if expanded === dua.id}
									<div class="mt-3 space-y-3 border-t border-border pt-3">
										<ArabicText text={dua.arabic} size="lg" />
										<p class="text-xs leading-relaxed text-muted italic">{dua.latin}</p>
										<p class="text-sm leading-relaxed text-foreground">{dua.translation}</p>
									</div>
								{/if}
							</Card>
						{/each}
					</div>
				</div>
			{/each}
		</div>
	{/if}
</div>
