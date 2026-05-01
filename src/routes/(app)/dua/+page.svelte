<script lang="ts">
	import { duaLibrary } from '$lib/data/dua';
	import DuaCard from '$lib/components/ui/DuaCard.svelte';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import gsap from 'gsap';
	import { MagnifyingGlass, X } from 'phosphor-svelte';

	type DuaCategory =
		| 'niat'
		| 'tawaf'
		| 'sai'
		| 'wukuf'
		| 'jumrah'
		| 'safar'
		| 'masjid'
		| 'dzikir'
		| 'umum';

	const CATEGORY_ORDER: DuaCategory[] = [
		'niat',
		'masjid',
		'tawaf',
		'sai',
		'wukuf',
		'jumrah',
		'safar',
		'dzikir',
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
		dzikir: 'Dzikir Pagi Petang',
		umum: 'Umum'
	};

	type DuaGroup = { category: DuaCategory; duas: typeof duaLibrary };
	const groups: DuaGroup[] = [];
	for (const cat of CATEGORY_ORDER) {
		const duas = duaLibrary.filter((d) => d.category === cat);
		if (duas.length > 0) groups.push({ category: cat, duas });
	}

	let query = $state('');
	let selectedCategory: DuaCategory | null = $state(null);

	let scrollY = $state(0);
	let isFloatingExpanded = $state(false);

	let isScrolled = $derived(scrollY > 150);

	let floatingContainerRef: HTMLElement;
	let floatingInputRef: HTMLInputElement;
	let floatingLeftIconRef: HTMLElement;
	let floatingCloseRef: HTMLElement;
	let floatingFabIconRef: HTMLElement;

	$effect(() => {
		if (!floatingContainerRef) return;

		if (isScrolled || isFloatingExpanded || query) {
			gsap.to(floatingContainerRef, {
				opacity: 1,
				scale: 1,
				pointerEvents: 'auto',
				duration: 0.4,
				ease: 'back.out(1.5)'
			});
		} else {
			gsap.to(floatingContainerRef, {
				opacity: 0,
				scale: 0.8,
				pointerEvents: 'none',
				duration: 0.3,
				ease: 'power2.in'
			});
		}
	});

	$effect(() => {
		if (!floatingContainerRef) return;

		if (isFloatingExpanded) {
			gsap.to(floatingContainerRef, {
				width: '100%',
				borderRadius: '16px',
				duration: 0.4,
				ease: 'power3.inOut'
			});
			if (floatingFabIconRef) gsap.to(floatingFabIconRef, { opacity: 0, scale: 0, duration: 0.2 });
			if (floatingLeftIconRef)
				gsap.to(floatingLeftIconRef, { opacity: 1, delay: 0.2, duration: 0.2 });
			if (floatingCloseRef) gsap.to(floatingCloseRef, { opacity: 1, delay: 0.2, duration: 0.2 });
		} else {
			gsap.to(floatingContainerRef, {
				width: '56px',
				borderRadius: '9999px',
				duration: 0.4,
				ease: 'power3.inOut'
			});
			if (floatingFabIconRef)
				gsap.to(floatingFabIconRef, { opacity: 1, scale: 1, delay: 0.2, duration: 0.2 });
			if (floatingLeftIconRef) gsap.to(floatingLeftIconRef, { opacity: 0, duration: 0.1 });
			if (floatingCloseRef) gsap.to(floatingCloseRef, { opacity: 0, duration: 0.1 });
		}
	});

	function expandFloatingSearch() {
		isFloatingExpanded = true;
		setTimeout(() => floatingInputRef?.focus(), 100);
	}

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

	function selectCategory(cat: DuaCategory | null) {
		selectedCategory = selectedCategory === cat ? null : cat;
	}

	function clearSearch() {
		query = '';
	}

	function onSearchInput(e: Event) {
		query = (e.target as HTMLInputElement).value;
	}

	let pageContainer: HTMLElement;

	onMount(() => {
		const catParam = $page.url.searchParams.get('category');
		if (catParam && CATEGORY_ORDER.includes(catParam as DuaCategory)) {
			selectedCategory = catParam as DuaCategory;
		}

		const qParam = $page.url.searchParams.get('q');
		if (qParam) {
			query = qParam;
			isFloatingExpanded = true;
		}

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
<svelte:window bind:scrollY />

<div
	bind:this={pageContainer}
	class="page-enter relative mx-auto max-w-120 px-4 pt-[calc(env(safe-area-inset-top)+1rem)] pb-5"
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

	<!-- Floating Search FAB Wrapper -->
	<div
		class="pointer-events-none fixed right-0 left-0 z-50 flex justify-center px-4"
		style="bottom: calc(env(safe-area-inset-bottom, 0px) + 7rem);"
	>
		<div class="relative h-14 w-full max-w-120">
			<div
				bind:this={floatingContainerRef}
				class="pointer-events-auto absolute top-0 right-0 flex h-14 w-14 items-center overflow-hidden rounded-full border border-border/60 bg-surface/95 shadow-2xl backdrop-blur-xl"
				style="opacity: 0; pointer-events: none; transform: scale(0.8);"
			>
				<input
					bind:this={floatingInputRef}
					type="text"
					bind:value={query}
					oninput={onSearchInput}
					onblur={() => {
						if (!query) isFloatingExpanded = false;
					}}
					placeholder="Cari doa..."
					class="absolute inset-0 h-full w-full bg-transparent pr-12 pl-12 text-base text-foreground opacity-0 focus:outline-none {isFloatingExpanded
						? 'opacity-100'
						: ''}"
					style="transition: opacity 0.2s; {isFloatingExpanded
						? 'pointer-events: auto'
						: 'pointer-events: none'}"
				/>

				<div bind:this={floatingLeftIconRef} class="pointer-events-none absolute left-4 opacity-0">
					<MagnifyingGlass size={20} weight="regular" class="text-muted" />
				</div>

				<button
					bind:this={floatingCloseRef}
					onclick={() => {
						query = '';
						isFloatingExpanded = false;
					}}
					class="tap-target absolute right-2 flex h-10 w-10 items-center justify-center rounded-full text-muted opacity-0 hover:bg-black/5 dark:hover:bg-white/5 {query ||
					isFloatingExpanded
						? 'pointer-events-auto'
						: 'pointer-events-none'}"
				>
					<X size={18} weight="bold" />
				</button>

				<button
					bind:this={floatingFabIconRef}
					onclick={expandFloatingSearch}
					class="tap-target absolute right-0 flex h-14 w-14 items-center justify-center rounded-full text-foreground hover:bg-black/5 dark:hover:bg-white/5 {!query &&
					!isFloatingExpanded
						? 'pointer-events-auto'
						: 'pointer-events-none'}"
					aria-label="Cari doa"
				>
					<MagnifyingGlass size={24} weight="bold" />
				</button>
			</div>
		</div>
	</div>

	<!-- Header: title + search + chips -->
	<div class="gsap-card pt-4 pb-2">
		<div class="flex items-center justify-between">
			<h1 class="text-xl font-semibold">Kumpulan Doa</h1>
		</div>

		<!-- Search input -->
		<div class="mt-4">
			<div class="relative">
				<MagnifyingGlass
					size={20}
					weight="regular"
					class="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-muted"
					aria-hidden="true"
				/>
				<input
					type="text"
					bind:value={query}
					oninput={onSearchInput}
					placeholder="Cari doa..."
					class="w-full rounded-2xl border border-border/60 bg-surface/80 py-3.5 pr-12 pl-12 text-base text-foreground shadow-sm backdrop-blur-md transition-all placeholder:text-muted/60 focus:border-(--color-brand) focus:ring-2 focus:ring-(--color-pastel-green) focus:outline-none"
					aria-label="Cari doa"
				/>
				{#if query}
					<button
						onclick={clearSearch}
						class="tap-target absolute top-1/2 right-2 -translate-y-1/2 rounded-full p-2 text-muted hover:bg-black/5 dark:hover:bg-white/5"
						aria-label="Hapus pencarian"
					>
						<X size={16} weight="bold" />
					</button>
				{/if}
			</div>
		</div>

		<!-- Category chips -->
		<div class="relative -mx-4 mt-3 mb-2">
			<!-- Fade edge masks -->
			<div
				class="pointer-events-none absolute top-0 bottom-0 left-0 z-10 w-4 bg-gradient-to-r from-[var(--color-background)] to-transparent"
			></div>
			<div
				class="pointer-events-none absolute top-0 right-0 bottom-0 z-10 w-8 bg-gradient-to-l from-[var(--color-background)] to-transparent"
			></div>

			<div
				class="scrollbar-none flex gap-2.5 overflow-x-auto px-4 pt-1 pb-2"
				style="-webkit-overflow-scrolling: touch;"
			>
				<button
					onclick={() => selectCategory(null)}
					class="tap-target shrink-0 rounded-2xl px-5 py-2 text-sm font-semibold transition-all {selectedCategory ===
					null
						? 'scale-[1.02] bg-foreground text-background shadow-md'
						: 'border border-border/50 bg-surface text-muted shadow-sm hover:bg-black/5'}"
					aria-pressed={selectedCategory === null}
				>
					Semua
				</button>
				{#each CATEGORY_ORDER as cat (cat)}
					<button
						onclick={() => selectCategory(cat)}
						class="tap-target shrink-0 rounded-2xl px-5 py-2 text-sm font-semibold transition-all {selectedCategory ===
						cat
							? 'scale-[1.02] bg-foreground text-background shadow-md'
							: 'border border-border/50 bg-surface text-muted shadow-sm hover:bg-black/5'}"
						aria-pressed={selectedCategory === cat}
					>
						{CATEGORY_LABELS[cat]}
					</button>
				{/each}
			</div>
		</div>

		<!-- Result count or subtitle -->
		<div class="mt-1">
			{#if isFiltering}
				<p class="text-xs text-muted">
					{resultCount > 0
						? `${resultCount} doa ditemukan`
						: 'Doa tidak ditemukan. Coba kata lain.'}
				</p>
			{:else}
				<p class="text-xs text-muted">{duaLibrary.length} doa · Ketuk untuk membaca</p>
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
		<div class="gsap-card space-y-3">
			{#each filteredFlat as dua (dua.id)}
				<DuaCard {dua} showCategory={true} categoryLabel={CATEGORY_LABELS[dua.category]} />
			{/each}
		</div>
	{:else if selectedCategory}
		<!-- Single category (no group header needed) -->
		<div class="gsap-card space-y-3">
			{#each filteredFlat as dua (dua.id)}
				<DuaCard {dua} />
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
					<div class="space-y-3">
						{#each group.duas as dua (dua.id)}
							<DuaCard {dua} />
						{/each}
					</div>
				</div>
			{/each}
		</div>
	{/if}
</div>
