<script lang="ts">
	import { ritualGuides } from '$lib/data/ritual';
	import { PHASE_LABELS } from '$lib/data/itinerary';
	import Card from '$lib/components/ui/Card.svelte';
	import KaabaIcon from '$lib/components/ui/KaabaIcon.svelte';
	import { onMount } from 'svelte';
	import gsap from 'gsap';

	import {
		CaretLeft,
		CaretRight,
		BookOpenText,
		MapPin,
		Mosque,
		Buildings,
		CheckCircle,
		AirplaneTakeoff,
		MapTrifold,
		AirplaneLanding,
		Clock,
		MagnifyingGlass,
		X
	} from 'phosphor-svelte';

	const PHASE_ORDER = [
		'harian',
		'manasik',
		'arrival',
		'madinah',
		'madinah-to-makkah',
		'makkah',
		'ash-shishah',
		'rukun',
		'post-hajj',
		'departure'
	];

	type PhaseGroup = { phase: string; guides: typeof ritualGuides };
	const groups: PhaseGroup[] = [];
	for (const phase of PHASE_ORDER) {
		const guides = ritualGuides.filter((g) => g.phase === phase);
		if (guides.length > 0) groups.push({ phase, guides });
	}

	function getPhaseIcon(phase: string) {
		switch (phase) {
			case 'manasik':
				return MapTrifold;
			case 'arrival':
				return AirplaneLanding;
			case 'madinah':
				return Mosque;
			case 'madinah-to-makkah':
				return MapPin;
			case 'makkah':
				return Buildings;
			case 'ash-shishah':
				return Buildings;
			case 'rukun':
				return KaabaIcon;
			case 'post-hajj':
				return CheckCircle;
			case 'departure':
				return AirplaneTakeoff;
			case 'harian':
				return Clock;
			default:
				return MapPin;
		}
	}

	let query = $state('');
	let selectedPhase: string | null = $state(null);
	let scrollY = $state(0);
	let isFloatingExpanded = $state(false);

	let isScrolled = $derived(scrollY > 150);

	let floatingContainerRef: HTMLElement | undefined = $state();
	let floatingInputRef: HTMLInputElement | undefined = $state();
	let floatingLeftIconRef: HTMLElement | undefined = $state();
	let floatingCloseRef: HTMLElement | undefined = $state();
	let floatingFabIconRef: HTMLElement | undefined = $state();

	function normalize(s: string) {
		return s
			? s
					.toLowerCase()
					.normalize('NFD')
					.replace(/[\u0300-\u036f]/g, '')
			: '';
	}

	function matchQuery(guide: (typeof ritualGuides)[0]) {
		if (!query) return true;
		const q = normalize(query);
		return (
			normalize(guide.title).includes(q) ||
			normalize(guide.subtitle).includes(q) ||
			normalize(guide.overview).includes(q)
		);
	}

	let isFiltering = $derived(query.length > 0 || selectedPhase !== null);

	let filteredFlat = $derived(
		query
			? ritualGuides.filter(matchQuery)
			: selectedPhase
				? ritualGuides.filter((g) => g.phase === selectedPhase)
				: []
	);

	let resultCount = $derived(filteredFlat.length);

	function selectPhase(phase: string | null) {
		selectedPhase = selectedPhase === phase ? null : phase;
		query = '';
	}

	function clearSearch() {
		query = '';
	}

	function onSearchInput(e: Event) {
		query = (e.target as HTMLInputElement).value;
	}

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

	let pageContainer: HTMLElement | undefined = $state();

	onMount(() => {
		if (!pageContainer) return;

		const items = pageContainer.querySelectorAll('.gsap-item');
		gsap.fromTo(
			items,
			{ y: 60, opacity: 0, scale: 0.95 },
			{
				y: 0,
				opacity: 1,
				scale: 1,
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

<svelte:window bind:scrollY />

<svelte:head>
	<title>Panduan Ritual — Patuna Coklat-B</title>
</svelte:head>

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
				placeholder="Cari panduan ritual..."
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
				aria-label="Tutup pencarian"
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
				aria-label="Cari panduan ritual"
			>
				<MagnifyingGlass size={24} weight="bold" />
			</button>
		</div>
	</div>
</div>

<div
	bind:this={pageContainer}
	class="page-enter relative mx-auto min-h-dvh max-w-120 overflow-hidden px-4 pt-[calc(env(safe-area-inset-top)+1rem)]"
>
	<!-- Pastel Background Pattern -->
	<div class="pointer-events-none fixed inset-0 z-[-1] overflow-hidden bg-background">
		<div class="app-bg absolute inset-0 opacity-[0.03]"></div>
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

	<!-- Header -->
	<div class="gsap-item pt-4 pb-2">
		<div class="flex items-center justify-between">
			<div>
				<h1 class="text-xl font-semibold">Panduan Ritual</h1>
				<p class="mt-0.5 text-xs text-muted">Langkah demi langkah haji dan umrah</p>
			</div>
			<a
				href="/"
				class="tap-target flex items-center gap-1 rounded-lg border border-border bg-surface px-3 py-1.5 text-xs font-semibold text-(--color-brand)"
			>
				<CaretLeft size={14} weight="bold" />
				Kembali
			</a>
		</div>

		<!-- Search Input (Static) -->
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
					placeholder="Cari panduan ritual..."
					class="w-full rounded-2xl border border-border/60 bg-surface/80 py-3.5 pr-12 pl-12 text-base text-foreground shadow-sm backdrop-blur-md transition-all placeholder:text-muted/60 focus:border-(--color-brand) focus:ring-2 focus:ring-(--color-pastel-green) focus:outline-none"
					aria-label="Cari panduan ritual"
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
					onclick={() => selectPhase(null)}
					class="tap-target shrink-0 rounded-2xl px-5 py-2 text-sm font-semibold transition-all {selectedPhase ===
					null
						? 'scale-[1.02] bg-foreground text-background shadow-md'
						: 'border border-border/50 bg-surface text-muted shadow-sm hover:bg-black/5'}"
					aria-pressed={selectedPhase === null}
				>
					Semua
				</button>
				{#each groups as group (group.phase)}
					<button
						onclick={() => selectPhase(group.phase)}
						class="tap-target shrink-0 rounded-2xl px-5 py-2 text-sm font-semibold transition-all {selectedPhase ===
						group.phase
							? 'scale-[1.02] bg-foreground text-background shadow-md'
							: 'border border-border/50 bg-surface text-muted shadow-sm hover:bg-black/5'}"
						aria-pressed={selectedPhase === group.phase}
					>
						{PHASE_LABELS[group.phase] ?? group.phase}
					</button>
				{/each}
			</div>
		</div>

		<!-- Result count -->
		<div class="mt-1">
			{#if isFiltering}
				<p class="text-xs text-muted">
					{resultCount > 0
						? `${resultCount} panduan ditemukan`
						: 'Panduan tidak ditemukan. Coba kata lain.'}
				</p>
			{:else}
				<p class="text-xs text-muted">{ritualGuides.length} panduan · Ketuk untuk membaca</p>
			{/if}
		</div>
	</div>

	<div class="relative z-10 mt-4 space-y-10">
		{#if isFiltering}
			{#if filteredFlat.length === 0}
				<div class="gsap-item flex flex-col items-center justify-center py-12 text-center">
					<div
						class="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-surface/50 text-muted shadow-sm"
					>
						<MagnifyingGlass size={32} weight="duotone" />
					</div>
					<h3 class="text-lg font-bold text-foreground">Panduan tidak ditemukan</h3>
					<p class="mt-1 max-w-[250px] text-sm text-muted">
						Coba gunakan kata kunci lain atau pilih fase yang berbeda.
					</p>
					<button
						class="tap-target mt-6 rounded-lg bg-(--color-brand)/10 px-6 py-2 text-sm font-semibold text-(--color-brand) transition-colors hover:bg-(--color-brand)/20"
						onclick={() => {
							query = '';
							selectedPhase = null;
						}}
					>
						Reset Pencarian
					</button>
				</div>
			{:else}
				<div class="space-y-3">
					{#each filteredFlat as guide}
						<Card
							pressable
							href="/ritual/{guide.id}"
							class="gsap-item group relative overflow-hidden"
						>
							<div class="flex w-full items-center justify-between">
								<div class="flex flex-1 items-start gap-4 text-left">
									<div
										class="mt-0.5 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-(--color-brand)/10 text-(--color-brand) transition-all duration-300 group-hover:scale-110 group-hover:bg-(--color-brand) group-hover:text-surface"
									>
										<BookOpenText
											size={24}
											weight="fill"
											class="transition-colors duration-300"
											aria-hidden="true"
										/>
									</div>
									<div class="flex-1">
										<p
											class="mb-1 text-[10px] font-bold tracking-widest text-(--color-brand) uppercase"
										>
											{PHASE_LABELS[guide.phase] ?? guide.phase} &bull; {guide.subtitle}
										</p>
										<h3
											class="text-lg leading-tight font-bold text-foreground transition-colors duration-300 group-hover:text-(--color-brand)"
										>
											{guide.title}
										</h3>
										<p class="mt-1.5 line-clamp-2 text-sm leading-relaxed text-muted">
											{guide.overview}
										</p>
									</div>
								</div>
								<div class="ml-4 flex shrink-0 flex-col items-end gap-1">
									<CaretRight
										size={20}
										weight="bold"
										class="text-muted/30 transition-all duration-300 group-hover:translate-x-1 group-hover:text-(--color-brand)"
										aria-hidden="true"
									/>
								</div>
							</div>
						</Card>
					{/each}
				</div>
			{/if}
		{:else}
			{#each groups as group}
				{@const PhaseIcon = getPhaseIcon(group.phase)}
				<div class="relative">
					<!-- Sticky Phase Header -->
					<div
						class="gsap-item sticky top-[180px] z-20 mb-4 flex items-center gap-3 bg-transparent py-2 backdrop-blur-md"
					>
						<div
							class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-(--color-brand)/10 text-(--color-brand)"
						>
							<PhaseIcon size={20} weight="fill" />
						</div>
						<div>
							<h2 class="text-base font-bold text-foreground">
								{PHASE_LABELS[group.phase] ?? group.phase}
							</h2>
							<p class="text-xs font-medium text-muted">{group.guides.length} Panduan</p>
						</div>
					</div>

					<div class="space-y-3">
						{#each group.guides as guide}
							<Card
								pressable
								href="/ritual/{guide.id}"
								class="gsap-item group relative overflow-hidden"
							>
								<div class="flex w-full items-center justify-between">
									<div class="flex flex-1 items-start gap-4 text-left">
										<div
											class="mt-0.5 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-(--color-brand)/10 text-(--color-brand) transition-all duration-300 group-hover:scale-110 group-hover:bg-(--color-brand) group-hover:text-surface"
										>
											<BookOpenText
												size={24}
												weight="fill"
												class="transition-colors duration-300"
												aria-hidden="true"
											/>
										</div>
										<div class="flex-1">
											<p
												class="mb-1 text-[10px] font-bold tracking-widest text-(--color-brand) uppercase"
											>
												{guide.subtitle}
											</p>
											<h3
												class="text-lg leading-tight font-bold text-foreground transition-colors duration-300 group-hover:text-(--color-brand)"
											>
												{guide.title}
											</h3>
											<p class="mt-1.5 line-clamp-2 text-sm leading-relaxed text-muted">
												{guide.overview}
											</p>
										</div>
									</div>
									<div class="ml-4 flex shrink-0 flex-col items-end gap-1">
										<CaretRight
											size={20}
											weight="bold"
											class="text-muted/30 transition-all duration-300 group-hover:translate-x-1 group-hover:text-(--color-brand)"
											aria-hidden="true"
										/>
									</div>
								</div>
							</Card>
						{/each}
					</div>
				</div>
			{/each}
		{/if}
	</div>
</div>
