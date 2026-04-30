<script lang="ts">
	import { duaLibrary } from '$lib/data/dua';
	import DuaCard from '$lib/components/ui/DuaCard.svelte';
	import { onMount } from 'svelte';
	import gsap from 'gsap';
	import { MagnifyingGlass, X } from 'phosphor-svelte';

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

	let pageContainer: HTMLElement;

	onMount(() => {
		const cards = pageContainer.querySelectorAll('.gsap-card');
		gsap.fromTo(
			cards,
			{ y: 60, opacity: 0, scale: 0.95, rotation: () => Math.random() * 4 - 2 },
			{
				y: 0,
				opacity: 1,
				scale: 1,
				rotation: 0,
				duration: 0.8,
				stagger: 0.05,
				ease: 'back.out(1.2)'
			}
		);

		const shapes = pageContainer.querySelectorAll('.gsap-shape');
		shapes.forEach((shape, i) => {
			gsap.to(shape, {
				y: 'random(-20, 20)',
				x: 'random(-20, 20)',
				rotation: 'random(-15, 15)',
				duration: 'random(3, 6)',
				repeat: -1,
				yoyo: true,
				ease: 'sine.inOut',
				delay: i * 0.5
			});
		});
	});
</script>

<svelte:head><title>Kumpulan Doa — Patuna Coklat-B</title></svelte:head>

<div
	bind:this={pageContainer}
	class="page-enter relative mx-auto max-w-120 overflow-hidden px-4 pt-[calc(env(safe-area-inset-top)+1rem)] pb-24"
>
	<!-- Pastel Background Pattern -->
	<div class="pointer-events-none fixed inset-0 z-[-1] overflow-hidden bg-background">
		<div class="app-bg absolute inset-0 opacity-[0.03]"></div>
		<!-- Colorful floating shapes -->
		<div
			class="gsap-shape absolute top-[-10%] left-[-10%] h-96 w-96 rounded-full bg-[var(--color-pastel-green)] opacity-40 mix-blend-multiply blur-3xl"
		></div>
		<div
			class="gsap-shape absolute top-[20%] right-[-10%] h-80 w-80 rounded-full bg-[var(--color-pastel-blue)] opacity-30 mix-blend-multiply blur-3xl"
		></div>
		<div
			class="gsap-shape absolute bottom-[10%] left-[20%] h-[30rem] w-[30rem] rounded-full bg-[var(--color-pastel-yellow)] opacity-30 mix-blend-multiply blur-3xl"
		></div>
	</div>

	<!-- Sticky header: title + search + chips -->
	<div class="gsap-card sticky top-0 z-10 bg-background/80 pt-4 pb-2 backdrop-blur-md">
		<h1 class="text-xl font-semibold">Kumpulan Doa</h1>

		<!-- Search input -->
		<div class="relative mt-3">
			<MagnifyingGlass
				size={16}
				weight="regular"
				class="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-muted"
				aria-hidden="true"
			/>
			<input
				type="text"
				value={query}
				oninput={onSearchInput}
				placeholder="Cari doa..."
				class="w-full rounded-lg border border-border/50 bg-surface py-2.5 pr-9 pl-9 text-sm text-foreground placeholder:text-muted/60 focus:border-(--color-brand) focus:ring-1 focus:ring-(--color-brand)/20 focus:outline-none"
				aria-label="Cari doa"
			/>
			{#if query}
				<button
					onclick={clearSearch}
					class="tap-target absolute top-1/2 right-2 -translate-y-1/2 rounded-full p-1 text-muted"
					aria-label="Hapus pencarian"
				>
					<X size={14} weight="bold" />
				</button>
			{/if}
		</div>

		<!-- Category chips -->
		<div class="scrollbar-none mt-2.5 flex gap-2 overflow-x-auto pb-1">
			<button
				onclick={() => selectCategory(null)}
				class="tap-target shrink-0 rounded-full px-3 py-1 text-xs font-medium transition-colors {selectedCategory ===
				null
					? 'border border-(--color-brand) bg-(--color-accent-light) text-(--color-brand)'
					: 'border border-border/50 bg-surface text-muted'}"
				aria-pressed={selectedCategory === null}
			>
				Semua
			</button>
			{#each CATEGORY_ORDER as cat (cat)}
				<button
					onclick={() => selectCategory(cat)}
					class="tap-target shrink-0 rounded-full px-3 py-1 text-xs font-medium transition-colors {selectedCategory ===
					cat
						? 'border border-(--color-brand) bg-(--color-accent-light) text-(--color-brand)'
						: 'border border-border/50 bg-surface text-muted'}"
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
		<div class="gsap-card py-12 text-center">
			<p class="text-sm text-muted">Tidak ada doa yang cocok.</p>
		</div>
	{:else if query}
		<!-- Flat list when searching -->
		<div class="gsap-card space-y-4">
			{#each filteredFlat as dua (dua.id)}
				<DuaCard
					{dua}
					expanded={expanded === dua.id}
					onToggle={() => toggle(dua.id)}
					showCategory={true}
					categoryLabel={CATEGORY_LABELS[dua.category]}
				/>
			{/each}
		</div>
	{:else if selectedCategory}
		<!-- Single category (no group header needed) -->
		<div class="gsap-card space-y-4">
			{#each filteredFlat as dua (dua.id)}
				<DuaCard {dua} expanded={expanded === dua.id} onToggle={() => toggle(dua.id)} />
			{/each}
		</div>
	{:else}
		<!-- Default grouped view -->
		<div class="space-y-8">
			{#each groups as group (group.category)}
				<div class="gsap-card">
					<p class="mb-3 pl-1 text-xs font-bold tracking-widest text-muted/80 uppercase">
						{CATEGORY_LABELS[group.category]}
					</p>
					<div class="space-y-4">
						{#each group.duas as dua (dua.id)}
							<DuaCard {dua} expanded={expanded === dua.id} onToggle={() => toggle(dua.id)} />
						{/each}
					</div>
				</div>
			{/each}
		</div>
	{/if}
</div>
