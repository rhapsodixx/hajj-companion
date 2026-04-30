<script lang="ts">
	import { itinerary, getEffectiveToday } from '$lib/data/itinerary';
	import PhaseRibbon from '$lib/components/ui/PhaseRibbon.svelte';

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

	const PHASE_ORDER = [
		'arrival',
		'madinah',
		'madinah-to-makkah',
		'makkah',
		'ash-shishah',
		'rukun',
		'post-hajj',
		'departure'
	];

	const today = getEffectiveToday();
	const todayDayNumber = itinerary.find((d) => d.gregorianDate === today)?.dayNumber;

	// Group days by phase, preserving order
	type PhaseGroup = { phase: string; days: typeof itinerary };
	const groups: PhaseGroup[] = [];
	for (const phase of PHASE_ORDER) {
		const days = itinerary.filter((d) => d.phase === phase);
		if (days.length > 0) groups.push({ phase, days });
	}

	function formatGregorian(iso: string): string {
		const d = new Date(iso + 'T00:00:00');
		return d.toLocaleDateString('id-ID', { weekday: 'short', day: 'numeric', month: 'short' });
	}

	function scrollToToday() {
		document.getElementById('today-row')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
	}
</script>

<svelte:head><title>Jadwal — Patuna Coklat-B</title></svelte:head>

<div class="pt-safe mx-auto max-w-120 px-4 pb-4">
	<!-- Header -->
	<div class="sticky top-0 z-10 flex items-center justify-between bg-background pt-4 pb-3">
		<div>
			<h1 class="text-xl font-semibold">Jadwal Perjalanan</h1>
			<p class="mt-0.5 text-xs text-muted">26 hari · Coklat B · 1447 H</p>
		</div>
		{#if todayDayNumber}
			<button
				onclick={scrollToToday}
				class="tap-target rounded-lg border border-border bg-surface px-3 text-xs font-semibold text-(--color-brand)"
			>
				Hari ini ↓
			</button>
		{/if}
	</div>

	<!-- Phase groups -->
	<div class="space-y-6">
		{#each groups as group}
			<!-- Phase heading -->
			<div>
				<div class="mb-2 flex items-center gap-3">
					<PhaseRibbon phase={group.phase} label={PHASE_LABELS[group.phase] ?? group.phase} />
					<span class="text-xs text-muted">
						Hari {group.days[0].dayNumber}
						{#if group.days.length > 1}– {group.days[group.days.length - 1].dayNumber}{/if}
					</span>
				</div>

				<!-- Day rows -->
				<div class="overflow-hidden rounded-xl border border-border">
					{#each group.days as day, i}
						{@const isToday = day.dayNumber === todayDayNumber}
						{@const isPast = today > day.gregorianDate}
						<a
							href="/itinerary/{day.dayNumber}"
							id={isToday ? 'today-row' : undefined}
							class="flex items-center gap-3 px-4 py-3 transition-colors duration-100
								{i > 0 ? 'border-t border-border' : ''}
								{isToday ? 'bg-(--color-brand)/8' : isPast ? 'bg-surface/40' : 'bg-surface'}
								active:bg-(--color-brand)/10"
						>
							<!-- Day number badge -->
							<div
								class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-sm font-bold
								{isToday
									? 'bg-(--color-brand) text-white'
									: isPast
										? 'bg-border text-muted'
										: 'bg-border/60 text-foreground'}"
							>
								{day.dayNumber}
							</div>

							<!-- Content -->
							<div class="min-w-0 flex-1">
								<div class="flex items-baseline gap-2">
									<p
										class="truncate text-sm leading-tight font-medium
										{isPast && !isToday ? 'text-muted' : 'text-foreground'}"
									>
										{day.location}
									</p>
									{#if day.ritualGuideId}
										<span
											class="shrink-0 text-[10px] font-semibold tracking-wide text-(--color-brand) uppercase"
											>Ritual</span
										>
									{/if}
								</div>
								<p class="mt-0.5 truncate text-xs text-muted">
									{formatGregorian(day.gregorianDate)} · {day.hijriDate}
								</p>
							</div>

							<!-- Today indicator / chevron -->
							<div class="shrink-0">
								{#if isToday}
									<span class="text-[10px] font-bold tracking-wide text-(--color-brand) uppercase"
										>Hari ini</span
									>
								{:else}
									<svg
										width="16"
										height="16"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2.5"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="text-border"
										aria-hidden="true"
									>
										<polyline points="9 18 15 12 9 6" />
									</svg>
								{/if}
							</div>
						</a>
					{/each}
				</div>
			</div>
		{/each}
	</div>

	<!-- Footer note -->
	<p class="mt-6 text-center text-xs text-muted">
		Program dapat berubah sesuai kondisi lapangan.<br />
		Hotel: Grand Plaza Badr (Madinah) · Marriott Jabal Omar (Makkah)
	</p>
</div>
