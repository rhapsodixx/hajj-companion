<script lang="ts">
	import { page } from '$app/state';
	import { getDay } from '$lib/data/itinerary';
	import { getDuaByIds } from '$lib/data/dua';
	import { getClimate } from '$lib/data/climate';
	import Card from '$lib/components/ui/Card.svelte';
	import HeroCard from '$lib/components/ui/HeroCard.svelte';
	import PhaseRibbon from '$lib/components/ui/PhaseRibbon.svelte';
	import ArabicText from '$lib/components/ui/ArabicText.svelte';
	import Button from '$lib/components/ui/Button.svelte';

	const PHASE_LABELS: Record<string, string> = {
		arrival: 'Kedatangan',
		madinah: 'Madinah',
		'madinah-to-makkah': 'Madinah → Makkah',
		makkah: 'Makkah',
		'ash-shishah': 'Ash Shishah',
		rukun: 'Rukun Haji',
		'post-hajj': 'Setelah Haji',
		departure: 'Kepulangan'
	};

	const dayNumber = $derived(page.params?.day ? parseInt(page.params.day, 10) : 0);
	const day = $derived(getDay(dayNumber));
	const duas = $derived(day ? getDuaByIds(day.duaIds) : []);
	const climate = $derived(day ? getClimate(day.climateNormId) : null);
	const today = new Date().toISOString().slice(0, 10);
	const isToday = $derived(day?.gregorianDate === today);

	function formatGregorian(iso: string): string {
		const d = new Date(iso + 'T00:00:00');
		return d.toLocaleDateString('id-ID', {
			weekday: 'long',
			day: 'numeric',
			month: 'long',
			year: 'numeric'
		});
	}
</script>

<svelte:head>
	<title
		>{day
			? `Hari ${day.dayNumber} — ${day.location} · Patuna Coklat-B`
			: 'Jadwal — Patuna Coklat-B'}</title
	>
</svelte:head>

{#if day}
	<div class="mx-auto max-w-120">
		<!-- Back nav -->
		<div class="pt-safe px-4 pt-4 pb-2">
			<a href="/itinerary" class="inline-flex items-center gap-1 text-sm text-muted">
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
				Jadwal
			</a>
		</div>

		<!-- Hero -->
		<div class="px-4 pb-4">
			<HeroCard phase={day.phase}>
				{#snippet label()}
					<div class="flex items-center gap-2">
						<PhaseRibbon phase={day.phase} label={PHASE_LABELS[day.phase] ?? day.phase} />
						{#if isToday}
							<span
								class="rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-bold tracking-wide text-white/90 uppercase"
								>Hari ini</span
							>
						{/if}
					</div>
				{/snippet}

				<h1 class="mt-2 text-2xl leading-tight font-semibold text-white">
					Hari {day.dayNumber} — {day.routeLabel}
				</h1>
				<p class="mt-1.5 text-sm text-white/80">{formatGregorian(day.gregorianDate)}</p>
				<p class="mt-0.5 text-sm text-white/70">{day.hijriDate}</p>
			</HeroCard>
		</div>

		<!-- Content -->
		<div class="space-y-4 px-4 pb-6">
			<!-- Ritual guide shortcut (critical days) -->
			{#if day.ritualGuideId}
				<Card pressable href="/ritual/{day.ritualGuideId}">
					<div class="flex items-center justify-between gap-3">
						<div>
							<p class="text-[10px] font-bold tracking-widest text-(--color-brand) uppercase">
								Panduan Ibadah
							</p>
							<p class="mt-0.5 font-medium text-foreground">Buka panduan langkah demi langkah</p>
							<p class="mt-0.5 text-xs text-muted">Niat, tawaf, doa, dan tips penting</p>
						</div>
						<svg
							width="20"
							height="20"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
							class="shrink-0 text-(--color-brand)"
							aria-hidden="true"
						>
							<polyline points="9 18 15 12 9 6" />
						</svg>
					</div>
				</Card>
			{/if}

			<!-- What to do -->
			<Card>
				<p class="mb-2 text-[10px] font-bold tracking-widest text-muted uppercase">
					Aktivitas hari ini
				</p>
				<p class="text-sm leading-relaxed text-foreground">{day.whatToDo}</p>
			</Card>

			<!-- Timeline -->
			{#if day.activities.length > 0}
				<div>
					<p class="mb-2 px-1 text-[10px] font-bold tracking-widest text-muted uppercase">Jadwal</p>
					<div class="overflow-hidden rounded-xl border border-border">
						{#each day.activities as activity, i}
							<div class="flex gap-3 px-4 py-3 {i > 0 ? 'border-t border-border' : ''} bg-surface">
								<!-- Time -->
								<div class="w-12 shrink-0 pt-0.5">
									{#if activity.time}
										<span class="text-xs font-semibold text-(--color-brand) tabular-nums"
											>{activity.time}</span
										>
									{:else}
										<span class="text-xs text-muted">—</span>
									{/if}
								</div>
								<!-- Activity -->
								<div class="min-w-0 flex-1">
									<div class="flex items-start gap-2">
										<p class="flex-1 text-sm leading-tight font-medium text-foreground">
											{activity.title}
										</p>
										{#if activity.conditional}
											<span
												class="mt-0.5 shrink-0 rounded border border-border px-1 py-0.5 text-[9px] font-bold tracking-wide text-muted uppercase"
												>Waktu Fleksibel</span
											>
										{/if}
									</div>
									{#if activity.location}
										<p class="mt-0.5 text-xs text-muted">{activity.location}</p>
									{/if}
									<p class="mt-1 text-xs leading-snug text-muted">{activity.description}</p>
								</div>
							</div>
						{/each}
					</div>
				</div>
			{/if}

			<!-- Dress code -->
			{#if day.dressCode}
				<Card>
					<p class="mb-2 text-[10px] font-bold tracking-widest text-muted uppercase">Pakaian</p>
					<div class="space-y-1.5 text-sm">
						<div class="flex gap-2">
							<span class="w-12 shrink-0 text-muted">Pria</span>
							<span class="text-foreground">{day.dressCode.men}</span>
						</div>
						<div class="flex gap-2">
							<span class="w-12 shrink-0 text-muted">Wanita</span>
							<span class="text-foreground">{day.dressCode.women}</span>
						</div>
					</div>
				</Card>
			{/if}

			<!-- Koper note -->
			{#if day.koperNote}
				<Card>
					<p class="mb-1 text-[10px] font-bold tracking-widest text-(--color-brand) uppercase">
						Info Koper
					</p>
					<p class="text-sm text-foreground">{day.koperNote}</p>
				</Card>
			{/if}

			<!-- What to bring -->
			{#if day.whatToBring.length > 0}
				<Card>
					<p class="mb-2 text-[10px] font-bold tracking-widest text-muted uppercase">
						Yang perlu dibawa
					</p>
					<ul class="space-y-1.5">
						{#each day.whatToBring as item}
							<li class="flex gap-2 text-sm text-foreground">
								<span class="mt-0.5 shrink-0 text-(--color-brand)">·</span>
								<span>{item}</span>
							</li>
						{/each}
					</ul>
				</Card>
			{/if}

			<!-- Tips -->
			{#if day.tips.length > 0}
				<Card>
					<p class="mb-2 text-[10px] font-bold tracking-widest text-muted uppercase">Tips</p>
					<ul class="space-y-2">
						{#each day.tips as tip}
							<li class="flex gap-2 text-sm text-foreground">
								<span class="mt-0.5 shrink-0 text-gold">·</span>
								<span>{tip}</span>
							</li>
						{/each}
					</ul>
				</Card>
			{/if}

			<!-- Climate -->
			{#if climate}
				<Card>
					<div class="flex items-start justify-between gap-3">
						<div class="min-w-0 flex-1">
							<p class="mb-1 text-[10px] font-bold tracking-widest text-muted uppercase">
								Info Cuaca · {climate.city}
							</p>
							<p class="text-sm leading-relaxed text-foreground">{climate.advice}</p>
						</div>
						<div class="shrink-0 text-right">
							<p class="text-2xl font-semibold text-foreground">{climate.tempMaxC}°</p>
							<p class="text-xs text-muted">{climate.tempMinC}°–{climate.tempMaxC}°C</p>
						</div>
					</div>
				</Card>
			{/if}

			<!-- Du'a of the day -->
			{#if duas.length > 0}
				<div>
					<p class="mb-2 px-1 text-[10px] font-bold tracking-widest text-muted uppercase">
						Doa Hari Ini
					</p>
					<div class="space-y-3">
						{#each duas as dua}
							<Card>
								<p class="mb-2 text-xs font-semibold text-(--color-brand)">{dua.title}</p>
								<ArabicText text={dua.arabic} size="base" />
								<p class="mt-2 text-xs leading-relaxed text-muted italic">{dua.latin}</p>
								<p class="mt-1.5 text-sm leading-relaxed text-foreground">{dua.translation}</p>
								<p class="mt-2 border-t border-border pt-2 text-xs text-muted">{dua.whenToRead}</p>
							</Card>
						{/each}
					</div>
				</div>
			{/if}

			<!-- Patuna note -->
			{#if day.patunaNote}
				<Card>
					<p class="mb-1 text-[10px] font-bold tracking-widest text-(--color-brand) uppercase">
						Catatan Patuna
					</p>
					<p class="text-sm leading-relaxed text-foreground">{day.patunaNote}</p>
				</Card>
			{/if}

			<!-- Prev / Next navigation -->
			<div class="flex gap-3 pt-2">
				{#if dayNumber > 1}
					<Button href="/itinerary/{dayNumber - 1}" variant="secondary" size="md" class="flex-1">
						← Hari {dayNumber - 1}
					</Button>
				{:else}
					<div class="flex-1"></div>
				{/if}
				{#if dayNumber < 26}
					<Button href="/itinerary/{dayNumber + 1}" variant="secondary" size="md" class="flex-1">
						Hari {dayNumber + 1} →
					</Button>
				{:else}
					<div class="flex-1"></div>
				{/if}
			</div>
		</div>
	</div>
{:else}
	<div class="pt-safe mx-auto max-w-120 px-4 py-12 text-center">
		<p class="text-muted">Hari tidak ditemukan.</p>
		<Button href="/itinerary" variant="ghost" size="md" class="mt-4">← Kembali ke Jadwal</Button>
	</div>
{/if}
