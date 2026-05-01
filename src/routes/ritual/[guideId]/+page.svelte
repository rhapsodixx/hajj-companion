<script lang="ts">
	import { page } from '$app/state';
	import { getGuide } from '$lib/data/ritual';
	import { getDuaByIds } from '$lib/data/dua';
	import { getContact } from '$lib/data/contacts';
	import ArabicText from '$lib/components/ui/ArabicText.svelte';
	import Card from '$lib/components/ui/Card.svelte';
	import LostButton from '$lib/components/ui/LostButton.svelte';
	import { onMount, tick } from 'svelte';
	import { goto } from '$app/navigation';
	import gsap from 'gsap';
	import { CaretLeft, CaretRight, BookOpenText, CheckCircle } from 'phosphor-svelte';

	const guideId = $derived(page.params?.guideId ?? '');
	const guide = $derived(getGuide(guideId));
	const relatedDuas = $derived(guide ? getDuaByIds(guide.duaIds) : []);

	function getHotelForDay(dayNumbers: number[]) {
		const firstDay = dayNumbers[0] ?? 0;
		if (firstDay >= 1 && firstDay <= 6) return getContact('hotel-madinah');
		if (firstDay >= 7 && firstDay <= 10) return getContact('hotel-makkah');
		return getContact('apartment-ash-shishah');
	}

	const hotel = $derived(guide ? getHotelForDay(guide.dayNumbers) : null);

	type Mode = 'overview' | 'steps' | 'closing';
	let mode = $state<Mode>('overview');
	let stepIndex = $state(0);

	const totalSteps = $derived(guide ? guide.steps.length : 0);
	const currentStep = $derived(guide?.steps[stepIndex] ?? null);

	let contentContainer: HTMLElement | undefined = $state();
	let stepContainer: HTMLElement | undefined = $state();
	let isAnimating = false;

	async function transitionMode(newMode: Mode) {
		if (isAnimating) return;
		isAnimating = true;

		if (!contentContainer) {
			mode = newMode;
			isAnimating = false;
			return;
		}

		await gsap.to(contentContainer, {
			y: 10,
			opacity: 0,
			duration: 0.2,
			ease: 'power2.in'
		});

		mode = newMode;
		await tick();

		gsap.set(contentContainer, { clearProps: 'all' });

		gsap.fromTo(
			contentContainer.children,
			{ y: 20, opacity: 0 },
			{ y: 0, opacity: 1, duration: 0.4, stagger: 0.05, ease: 'back.out(1.2)' }
		);
		isAnimating = false;
	}

	async function transitionStep(newIndex: number) {
		if (isAnimating || newIndex === stepIndex) return;
		isAnimating = true;

		if (!stepContainer) {
			stepIndex = newIndex;
			isAnimating = false;
			return;
		}

		const isNext = newIndex > stepIndex;

		await gsap.to(stepContainer, {
			x: isNext ? -30 : 30,
			opacity: 0,
			duration: 0.2,
			ease: 'power2.in'
		});

		stepIndex = newIndex;
		await tick();

		gsap.fromTo(
			stepContainer,
			{ x: isNext ? 30 : -30, opacity: 0 },
			{ x: 0, opacity: 1, duration: 0.4, ease: 'back.out(1)' }
		);
		isAnimating = false;
	}

	function startSteps() {
		stepIndex = 0;
		transitionMode('steps');
	}

	function nextStep() {
		if (mode === 'closing') {
			goto('/ritual');
			return;
		}
		if (stepIndex < totalSteps - 1) transitionStep(stepIndex + 1);
		else transitionMode('closing');
	}

	function prevStep() {
		if (mode === 'closing') {
			stepIndex = totalSteps - 1;
			transitionMode('steps');
		} else if (stepIndex > 0) {
			transitionStep(stepIndex - 1);
		} else {
			transitionMode('overview');
		}
	}

	let touchStartX = 0;
	const SWIPE_THRESHOLD = 50;

	function onTouchStart(e: TouchEvent) {
		touchStartX = e.touches[0]?.clientX ?? 0;
	}

	function onTouchEnd(e: TouchEvent) {
		const dx = (e.changedTouches[0]?.clientX ?? 0) - touchStartX;
		if (Math.abs(dx) < SWIPE_THRESHOLD) return;
		if (dx < 0) nextStep();
		else prevStep();
	}

	let pageContainer: HTMLElement | undefined = $state();

	onMount(() => {
		if (!pageContainer) return;

		const tl = gsap.timeline();

		const items = pageContainer.querySelectorAll('.gsap-item');
		tl.fromTo(
			items,
			{ y: 40, opacity: 0, scale: 0.98 },
			{
				y: 0,
				opacity: 1,
				scale: 1,
				duration: 0.6,
				stagger: 0.08,
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

<svelte:head>
	<title>{guide ? guide.title : 'Panduan Ritual'} — Patuna Coklat-B</title>
</svelte:head>

{#if guide}
	<div
		bind:this={pageContainer}
		class="page-enter relative mx-auto flex min-h-dvh max-w-120 flex-col overflow-hidden px-4 pt-[calc(env(safe-area-inset-top)+1rem)] pb-8"
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

		<!-- Back link -->
		<div
			class="gsap-item sticky top-0 z-30 flex items-center justify-between bg-transparent pt-4 pb-3 backdrop-blur-md"
		>
			<a
				href="/ritual"
				class="tap-target flex items-center gap-1 rounded-lg border border-border bg-surface px-3 py-1.5 text-xs font-semibold text-(--color-brand)"
			>
				<CaretLeft size={14} weight="bold" />
				Kembali ke Daftar
			</a>
			{#if mode === 'steps'}
				<div class="text-xs font-bold tracking-widest text-(--color-brand) uppercase">
					Langkah {stepIndex + 1} <span class="font-normal text-muted/50">/ {totalSteps}</span>
				</div>
			{/if}
		</div>

		<!-- Title block -->
		{#if mode !== 'steps'}
			<header class="gsap-item relative z-10 mt-2 mb-5">
				<div class="flex items-start gap-4">
					<div
						class="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-(--color-brand)/10 text-(--color-brand)"
					>
						<BookOpenText size={24} weight="fill" aria-hidden="true" />
					</div>
					<div>
						<p class="mb-1 text-[10px] font-bold tracking-widest text-(--color-brand) uppercase">
							{guide.subtitle}
						</p>
						<h1 class="text-2xl leading-tight font-bold text-foreground">{guide.title}</h1>
						{#if guide.dayNumbers.length > 0}
							<p class="mt-1.5 text-sm font-medium text-muted">
								Hari {guide.dayNumbers.join(' & ')}
							</p>
						{/if}
					</div>
				</div>
			</header>
		{/if}

		<!-- Step progress indicator (segmented bar) -->
		{#if mode === 'steps'}
			<div class="gsap-item mt-4 mb-6 flex items-center gap-1.5 px-2" aria-hidden="true">
				{#each guide.steps as _, i (i)}
					<div
						class="h-1.5 flex-1 rounded-full transition-all duration-500 ease-out {i <= stepIndex
							? 'bg-(--color-brand)'
							: 'bg-border/40'}"
					></div>
				{/each}
			</div>
		{/if}

		<!-- Content area -->
		<div class="relative z-10 flex flex-1 flex-col" bind:this={contentContainer}>
			<!-- ═══ OVERVIEW MODE ═══ -->
			{#if mode === 'overview'}
				<div class="flex-1">
					<p
						class="gsap-item mb-6 rounded-3xl border border-border/50 bg-surface/50 p-5 font-serif text-[15px] leading-relaxed text-foreground"
					>
						{guide.overview}
					</p>

					{#if guide.preparation.length > 0}
						<section class="gsap-item mb-6">
							<div class="mb-3 flex items-center gap-2">
								<div class="h-6 w-1 rounded-full bg-(--color-brand)"></div>
								<h2 class="text-sm font-bold tracking-widest text-foreground uppercase">
									Persiapan
								</h2>
							</div>
							<Card class="bg-surface/80 p-5 backdrop-blur-md">
								<ul class="space-y-4">
									{#each guide.preparation as item (item)}
										<li class="flex items-start gap-3 text-[15px] text-foreground">
											<CheckCircle
												size={20}
												weight="fill"
												class="mt-0.5 shrink-0 text-(--color-brand)"
											/>
											<span class="leading-relaxed">{item}</span>
										</li>
									{/each}
								</ul>
							</Card>
						</section>
					{/if}
				</div>

				<!-- Start button -->
				<button
					onclick={startSteps}
					class="gsap-item tap-target mt-auto w-full rounded-2xl bg-(--color-brand) px-5 py-4 text-center text-base font-bold text-background shadow-[0_4px_12px_rgba(0,0,0,0.1)] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-[0_6px_16px_rgba(0,0,0,0.15)] active:scale-[0.98]"
				>
					Mulai Panduan — {totalSteps} Langkah
				</button>

				<!-- ═══ STEP-BY-STEP MODE ═══ -->
			{:else if mode === 'steps' && currentStep}
				<div
					role="document"
					class="flex flex-1 flex-col"
					ontouchstart={onTouchStart}
					ontouchend={onTouchEnd}
					bind:this={stepContainer}
				>
					<!-- Step content -->
					<div
						class="relative flex-1 overflow-hidden rounded-3xl border border-border/50 bg-surface p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)]"
					>
						<!-- Decorative background for step number -->
						<div
							class="pointer-events-none absolute -top-10 -right-10 text-[120px] leading-none font-bold tracking-tighter text-muted/5 select-none"
						>
							{stepIndex + 1}
						</div>

						<h2 class="relative z-10 text-xl leading-tight font-bold text-foreground">
							{currentStep.title}
						</h2>
						<p class="relative z-10 mt-4 font-serif text-[15px] leading-relaxed text-foreground">
							{currentStep.instruction}
						</p>

						{#if currentStep.arabic}
							<div
								class="relative z-10 mt-6 overflow-hidden rounded-2xl bg-(--color-accent-light) p-5"
							>
								<div
									class="absolute top-0 right-0 -mt-10 -mr-10 h-24 w-24 rounded-full bg-(--color-brand)/5 blur-xl"
								></div>
								<div class="relative z-10">
									<ArabicText text={currentStep.arabic} size="lg" />
									{#if currentStep.arabicSource}
										<p
											class="mt-3 text-right text-xs font-medium tracking-wide text-muted/70 uppercase"
										>
											— {currentStep.arabicSource}
										</p>
									{/if}
								</div>
							</div>
						{/if}

						{#if currentStep.note}
							<div
								class="relative z-10 mt-5 flex gap-3 rounded-2xl bg-(--color-pastel-blue)/30 p-4 text-sm text-foreground"
							>
								<span class="shrink-0 text-xl leading-none">💡</span>
								<span class="font-serif leading-relaxed">{currentStep.note}</span>
							</div>
						{/if}

						{#if currentStep.warning}
							<div
								class="relative z-10 mt-5 flex gap-3 rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-foreground"
							>
								<span class="shrink-0 text-xl leading-none">⚠️</span>
								<span class="leading-relaxed font-medium text-red-900 dark:text-red-200"
									>{currentStep.warning}</span
								>
							</div>
						{/if}
					</div>
				</div>

				<!-- ═══ CLOSING MODE ═══ -->
			{:else if mode === 'closing'}
				<div class="flex-1">
					{#if guide.closingNote}
						<section class="mb-6">
							<div
								class="rounded-3xl border border-(--color-brand)/20 bg-gradient-to-br from-(--color-brand)/5 to-transparent p-6 text-center shadow-sm"
							>
								<div
									class="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-(--color-brand)/10 text-(--color-brand)"
								>
									<CheckCircle size={24} weight="fill" />
								</div>
								<p class="font-serif text-[15px] leading-relaxed text-foreground">
									{guide.closingNote}
								</p>
							</div>
						</section>
					{/if}

					{#if relatedDuas.length > 0}
						<section class="mb-6">
							<div class="mb-4 flex items-center gap-2">
								<div class="h-6 w-1 rounded-full bg-(--color-brand)"></div>
								<h2 class="text-sm font-bold tracking-widest text-foreground uppercase">
									Doa Terkait
								</h2>
							</div>
							<div class="space-y-4">
								{#each relatedDuas as dua (dua.id)}
									<Card
										class="border-l-4 border-l-(--color-brand) bg-surface/80 p-5 backdrop-blur-md"
									>
										<p
											class="mb-3 text-xs font-bold tracking-widest text-(--color-brand) uppercase"
										>
											{dua.title}
										</p>
										<ArabicText text={dua.arabic} size="base" />
										{#if dua.latin}
											<p class="mt-3 text-sm leading-relaxed text-muted italic">{dua.latin}</p>
										{/if}
										<div class="mt-4 h-px w-full bg-border/50"></div>
										<p class="mt-3 font-serif text-[13px] leading-relaxed text-foreground">
											{dua.translation}
										</p>
									</Card>
								{/each}
							</div>
						</section>
					{/if}
				</div>
			{/if}
		</div>

		<!-- Navigation buttons -->
		{#if mode !== 'overview'}
			<div class="relative z-10 mt-6 flex gap-3">
				<button
					onclick={prevStep}
					class="tap-target flex flex-1 items-center justify-center gap-2 rounded-2xl border-2 border-border bg-surface px-4 py-4 text-sm font-bold text-foreground transition-all duration-200 ease-out hover:border-muted/20 hover:bg-muted/5 active:scale-[0.98]"
				>
					<CaretLeft size={18} weight="bold" />
					Sebelumnya
				</button>
				<button
					onclick={nextStep}
					class="tap-target flex flex-1 items-center justify-center gap-2 rounded-2xl bg-(--color-brand) px-4 py-4 text-sm font-bold text-background shadow-[0_4px_12px_rgba(0,0,0,0.1)] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-[0_6px_16px_rgba(0,0,0,0.15)] active:scale-[0.98]"
				>
					{mode === 'closing'
						? 'Selesai'
						: mode === 'steps' && stepIndex === totalSteps - 1
							? 'Selesai'
							: 'Selanjutnya'}
					<CaretRight size={18} weight="bold" />
				</button>
			</div>
		{/if}

		<!-- Lost? Show hotel address to taxi driver -->
		{#if hotel && mode === 'closing'}
			<div class="mt-4">
				<LostButton {hotel} />
			</div>
		{/if}
	</div>
{:else}
	<div class="mx-auto max-w-120 px-4 pt-[calc(env(safe-area-inset-top)+1rem)] pb-6">
		<div class="pt-4 pb-3">
			<a href="/ritual" class="tap-target inline-flex items-center gap-1 text-sm text-muted">
				<CaretLeft size={16} weight="bold" />
				Kembali
			</a>
		</div>
		<p class="text-sm text-muted">Panduan ritual tidak ditemukan.</p>
	</div>
{/if}
