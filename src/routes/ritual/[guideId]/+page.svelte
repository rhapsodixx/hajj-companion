<script lang="ts">
	import { page } from '$app/state';
	import { getGuide } from '$lib/data/ritual';
	import { getDuaByIds } from '$lib/data/dua';
	import { getContact } from '$lib/data/contacts';
	import ArabicText from '$lib/components/ui/ArabicText.svelte';
	import Card from '$lib/components/ui/Card.svelte';
	import LostButton from '$lib/components/ui/LostButton.svelte';

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

	function startSteps() {
		stepIndex = 0;
		mode = 'steps';
	}

	function nextStep() {
		if (stepIndex < totalSteps - 1) stepIndex++;
		else mode = 'closing';
	}

	function prevStep() {
		if (stepIndex > 0) stepIndex--;
		else mode = 'overview';
	}

	function goToStep(i: number) {
		stepIndex = i;
		mode = 'steps';
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
</script>

<svelte:head>
	<title>{guide ? guide.title : 'Panduan Ritual'} — Patuna Coklat-B</title>
</svelte:head>

{#if guide}
	<div class="pt-safe page-enter mx-auto flex min-h-dvh max-w-120 flex-col px-4 pb-8">
		<!-- Back link -->
		<div class="pt-4 pb-3">
			<a href="/" class="inline-flex items-center gap-1 text-sm text-muted">
				<svg
					width="16"
					height="16"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="1.5"
					stroke-linecap="round"
					stroke-linejoin="round"
					aria-hidden="true"><polyline points="15 18 9 12 15 6" /></svg
				>
				Kembali
			</a>
		</div>

		<!-- Title block -->
		<header class="mb-5">
			<p class="text-xs font-semibold tracking-widest text-(--color-brand) uppercase">
				{guide.subtitle}
			</p>
			<h1 class="mt-1 text-2xl leading-tight font-semibold text-foreground">{guide.title}</h1>
			{#if guide.dayNumbers.length > 0}
				<p class="mt-1 text-sm text-muted">Hari {guide.dayNumbers.join(' & ')}</p>
			{/if}
		</header>

		<!-- Step dots (always visible when in step mode) -->
		{#if mode === 'steps'}
			<div
				class="mb-5 flex items-center justify-center gap-1.5"
				role="tablist"
				aria-label="Langkah"
			>
				{#each guide.steps as _, i (i)}
					<button
						onclick={() => goToStep(i)}
						role="tab"
						aria-selected={i === stepIndex}
						aria-label="Langkah {i + 1}"
						class="tap-target rounded-full transition-all duration-150 {i === stepIndex
							? 'h-2.5 w-2.5 bg-(--color-brand)'
							: 'h-2 w-2 bg-border'}"
					></button>
				{/each}
			</div>
		{/if}

		<!-- Content area -->
		<div class="flex-1">
			<!-- ═══ OVERVIEW MODE ═══ -->
			{#if mode === 'overview'}
				<p class="mb-6 font-serif text-sm leading-relaxed text-foreground">{guide.overview}</p>

				{#if guide.preparation.length > 0}
					<section class="mb-6">
						<p class="mb-3 text-[10px] font-bold tracking-widest text-muted uppercase">Persiapan</p>
						<Card>
							<div class="space-y-2">
							{#each guide.preparation as item (item)}
								<div class="flex gap-2.5 text-sm text-foreground">
									<span class="text-(--color-brand) mt-0.5 shrink-0">·</span>
									<span>{item}</span>
								</div>
							{/each}
							</div>
						</Card>
					</section>
				{/if}

				<!-- Start button -->
				<button
					onclick={startSteps}
					class="tap-target w-full rounded-xl bg-(--color-brand) px-5 py-4 text-center text-base font-semibold text-white transition-transform duration-100 ease-out active:scale-[0.98]"
				>
					Mulai Panduan — {totalSteps} Langkah
				</button>

				<!-- ═══ STEP-BY-STEP MODE ═══ -->
			{:else if mode === 'steps' && currentStep}
				<div role="document" class="page-enter" ontouchstart={onTouchStart} ontouchend={onTouchEnd}>
					<!-- Step number label -->
					<p class="mb-3 text-xs font-semibold tracking-widest text-(--color-brand) uppercase">
						Langkah {stepIndex + 1} dari {totalSteps}
					</p>

					<!-- Step content -->
					<div class="rounded-2xl bg-surface p-5 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
						<p class="text-lg font-semibold text-foreground">{currentStep.title}</p>
						<p class="mt-3 font-serif text-sm leading-relaxed text-foreground">
							{currentStep.instruction}
						</p>

						{#if currentStep.arabic}
							<div class="mt-4 rounded-2xl bg-(--color-accent-light) p-4">
								<ArabicText text={currentStep.arabic} size="lg" />
								{#if currentStep.arabicSource}
									<p class="mt-2 text-right text-xs text-muted">— {currentStep.arabicSource}</p>
								{/if}
							</div>
						{/if}

						{#if currentStep.note}
							<div class="mt-3 flex gap-2 text-sm text-muted">
								<span class="shrink-0">💡</span>
								<span class="font-serif">{currentStep.note}</span>
							</div>
						{/if}

						{#if currentStep.warning}
							<div
								class="mt-3 flex gap-2 rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-sm text-foreground"
							>
								<span class="shrink-0">⚠️</span>
								<span>{currentStep.warning}</span>
							</div>
						{/if}
					</div>
				</div>

				<!-- ═══ CLOSING MODE ═══ -->
			{:else if mode === 'closing'}
				<div class="page-enter">
					{#if guide.closingNote}
						<section class="mb-6">
							<div class="rounded-2xl border border-(--color-brand)/20 bg-(--color-accent-light) p-4">
								<p class="font-serif text-sm leading-relaxed text-foreground">
									{guide.closingNote}
								</p>
							</div>
						</section>
					{/if}

					{#if relatedDuas.length > 0}
						<section class="mb-6">
							<p class="mb-3 text-[10px] font-bold tracking-widest text-muted uppercase">
								Doa Terkait
							</p>
							<div class="space-y-3">
								{#each relatedDuas as dua (dua.id)}
									<Card>
										<p
											class="mb-2 text-xs font-semibold tracking-wide text-(--color-brand) uppercase"
										>
											{dua.title}
										</p>
										<ArabicText text={dua.arabic} size="base" />
										{#if dua.latin}
											<p class="mt-2 text-sm text-muted italic">{dua.latin}</p>
										{/if}
										<p class="mt-1 font-serif text-sm text-foreground">{dua.translation}</p>
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
			<div class="mt-6 flex gap-3">
				<button
					onclick={prevStep}
					class="tap-target flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-border bg-surface px-4 py-3.5 text-sm font-semibold text-foreground transition-transform duration-100 ease-out active:scale-[0.98]"
				>
					<svg
						width="16"
						height="16"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="1.5"
						stroke-linecap="round"
						stroke-linejoin="round"
						aria-hidden="true"><polyline points="15 18 9 12 15 6" /></svg
					>
					Sebelumnya
				</button>
				<button
					onclick={nextStep}
					class="tap-target flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-(--color-brand) px-4 py-3.5 text-sm font-semibold text-white transition-transform duration-100 ease-out active:scale-[0.98]"
				>
					{mode === 'steps' && stepIndex === totalSteps - 1 ? 'Selesai' : 'Selanjutnya'}
					<svg
						width="16"
						height="16"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="1.5"
						stroke-linecap="round"
						stroke-linejoin="round"
						aria-hidden="true"><polyline points="9 18 15 12 9 6" /></svg
					>
				</button>
			</div>
		{/if}

		<!-- Lost? Show hotel address to taxi driver -->
		{#if hotel && mode === 'closing'}
			<LostButton {hotel} />
		{/if}
	</div>
{:else}
	<div class="pt-safe mx-auto max-w-120 px-4 py-6">
		<div class="pt-4 pb-3">
			<a href="/" class="inline-flex items-center gap-1 text-sm text-muted">
				<svg
					width="16"
					height="16"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="1.5"
					stroke-linecap="round"
					stroke-linejoin="round"
					aria-hidden="true"><polyline points="15 18 9 12 15 6" /></svg
				>
				Kembali
			</a>
		</div>
		<p class="text-sm text-muted">Panduan ritual tidak ditemukan.</p>
	</div>
{/if}
