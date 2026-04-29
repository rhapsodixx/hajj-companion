<script lang="ts">
	import { duaLibrary } from '$lib/data/dua';
	import DuaCard from '$lib/components/dua/DuaCard.svelte';
	import SearchBar from '$lib/components/dua/SearchBar.svelte';
	import CategoryChips from '$lib/components/dua/CategoryChips.svelte';

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
		<SearchBar value={query} onInput={onSearchInput} onClear={clearSearch} />
		<CategoryChips
			categories={CATEGORY_ORDER}
			labels={CATEGORY_LABELS}
			selected={selectedCategory}
			onSelect={selectCategory}
		/>
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
	{:else if isFiltering}
		<!-- Flat filtered list (search or chip) -->
		<div class="space-y-2">
			{#each filteredFlat as dua (dua.id)}
				<DuaCard
					{dua}
					expanded={expanded === dua.id}
					showCategory={!!query}
					categoryLabel={CATEGORY_LABELS[dua.category]}
					onToggle={toggle}
				/>
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
							<DuaCard {dua} expanded={expanded === dua.id} onToggle={toggle} />
						{/each}
					</div>
				</div>
			{/each}
		</div>
	{/if}
</div>
