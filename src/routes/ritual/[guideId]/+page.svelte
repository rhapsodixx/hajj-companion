<script lang="ts">
	import { page } from '$app/state';
	import { getGuide } from '$lib/data/ritual';
	import { getDuaByIds } from '$lib/data/dua';
	import { getContact } from '$lib/data/contacts';
	import ArabicText from '$lib/components/ui/ArabicText.svelte';
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
</script>

<svelte:head>
	<title>{guide ? guide.title : 'Panduan Ritual'} — Patuna Coklat-B</title>
</svelte:head>

{#if guide}
	<div class="pt-safe page-enter mx-auto max-w-120 px-4 pb-8">
		<!-- Back link -->
		<div class="pt-4 pb-3">
			<a href="/" class="inline-flex items-center gap-1 text-sm text-muted">
				<svg
					width="16"
					height="16"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2.5"
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

		<!-- Overview -->
		<p class="mb-6 font-serif text-sm leading-relaxed text-foreground">{guide.overview}</p>

		<!-- Preparation -->
		{#if guide.preparation.length > 0}
			<section class="mb-6">
				<p class="mb-3 text-[10px] font-bold tracking-widest text-muted uppercase">Persiapan</p>
				<div class="space-y-2 rounded-xl border border-border bg-surface p-4">
					{#each guide.preparation as item}
						<div class="flex gap-2.5 text-sm text-foreground">
							<span class="mt-0.5 shrink-0 text-gold">·</span>
							<span>{item}</span>
						</div>
					{/each}
				</div>
			</section>
		{/if}

		<!-- Steps -->
		<section class="mb-6">
			<p class="mb-4 text-[10px] font-bold tracking-widest text-muted uppercase">Langkah-langkah</p>
			<div class="space-y-4">
				{#each guide.steps as step, i}
					<div class="relative pl-8">
						<!-- Step number -->
						<div
							class="absolute top-0 left-0 flex h-6 w-6 items-center justify-center rounded-full bg-(--color-brand) text-xs font-bold text-white"
						>
							{i + 1}
						</div>

						<div>
							<p class="font-semibold text-foreground">{step.title}</p>
							<p class="mt-1 font-serif text-sm leading-relaxed text-foreground">
								{step.instruction}
							</p>

							{#if step.arabic}
								<div class="mt-3 rounded-xl border border-border bg-surface p-4">
									<ArabicText text={step.arabic} size="lg" />
									{#if step.arabicSource}
										<p class="mt-2 text-right text-xs text-muted">— {step.arabicSource}</p>
									{/if}
								</div>
							{/if}

							{#if step.note}
								<div class="mt-2 flex gap-2 text-sm text-muted">
									<span class="shrink-0">💡</span>
									<span class="font-serif">{step.note}</span>
								</div>
							{/if}

							{#if step.warning}
								<div
									class="mt-2 flex gap-2 rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-sm text-foreground"
								>
									<span class="shrink-0">⚠️</span>
									<span>{step.warning}</span>
								</div>
							{/if}
						</div>

						<!-- Connector line (except last) -->
						{#if i < guide.steps.length - 1}
							<div class="absolute top-7 bottom-0 left-2.75 w-px bg-border"></div>
						{/if}
					</div>
				{/each}
			</div>
		</section>

		<!-- Closing note -->
		{#if guide.closingNote}
			<section class="mb-6">
				<div class="rounded-xl border border-gold/30 bg-gold/5 p-4">
					<p class="font-serif text-sm leading-relaxed text-foreground">{guide.closingNote}</p>
				</div>
			</section>
		{/if}

		<!-- Related du'as -->
		{#if relatedDuas.length > 0}
			<section class="mb-6">
				<p class="mb-3 text-[10px] font-bold tracking-widest text-muted uppercase">Doa Terkait</p>
				<div class="space-y-3">
					{#each relatedDuas as dua}
						<div class="rounded-xl border border-border bg-surface p-4">
							<p class="mb-2 text-xs font-semibold tracking-wide text-(--color-brand) uppercase">
								{dua.title}
							</p>
							<ArabicText text={dua.arabic} size="base" />
							{#if dua.latin}
								<p class="mt-2 text-sm text-muted italic">{dua.latin}</p>
							{/if}
							<p class="mt-1 font-serif text-sm text-foreground">{dua.translation}</p>
						</div>
					{/each}
				</div>
			</section>
		{/if}

		<!-- Lost? Show hotel address to taxi driver -->
		{#if hotel}
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
					stroke-width="2.5"
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
