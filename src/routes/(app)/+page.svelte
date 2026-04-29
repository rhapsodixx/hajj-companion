<script lang="ts">
	import { itinerary, getDayByDate } from '$lib/data/itinerary';
	import { getClimate } from '$lib/data/climate';
	import HeroCard from '$lib/components/ui/HeroCard.svelte';
	import Card from '$lib/components/ui/Card.svelte';
	import PhaseRibbon from '$lib/components/ui/PhaseRibbon.svelte';
	import Button from '$lib/components/ui/Button.svelte';

	const PHASE_LABELS: Record<string, string> = {
		arrival: 'Kedatangan',
		madinah: 'Madinah',
		'madinah-to-makkah': 'Madinah → Makkah',
		makkah: 'Makkah',
		'ash-shishah': 'Ash Shishah',
		rukun: 'Rukun Haji',
		'post-hajj': 'Pasca Haji',
		departure: 'Kepulangan'
	};

	function getTodayISO(): string {
		return new Date().toISOString().slice(0, 10);
	}

	function isAfterMaghrib(): boolean {
		const h = new Date().getHours();
		return h >= 18 || h < 4;
	}

	function getNextDay(dayNumber: number) {
		return itinerary.find((d) => d.dayNumber === dayNumber + 1);
	}

	function getNextActivity(activities: { time?: string | null; title: string; description: string; location?: string; conditional?: boolean }[]) {
		const now = new Date();
		const hhmm = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
		const timed = activities.filter((a) => a.time && a.time !== null);
		return timed.find((a) => (a.time ?? '') > hhmm) ?? timed[timed.length - 1] ?? null;
	}

	function minutesUntil(timeStr: string): number {
		const [hh, mm] = timeStr.split(':').map(Number);
		const now = new Date();
		const target = new Date(now);
		target.setHours(hh, mm, 0, 0);
		if (target <= now) target.setDate(target.getDate() + 1);
		return Math.round((target.getTime() - now.getTime()) / 60000);
	}

	function formatCountdown(minutes: number): string {
		if (minutes < 60) return `${minutes} menit lagi`;
		const h = Math.floor(minutes / 60);
		const m = minutes % 60;
		return m > 0 ? `${h} jam ${m} menit lagi` : `${h} jam lagi`;
	}

	const today = getTodayISO();
	const todayDay = getDayByDate(today);
	const afterMaghrib = isAfterMaghrib();
	const nextDay = todayDay ? getNextDay(todayDay.dayNumber) : null;
	const nextActivity = todayDay ? getNextActivity(todayDay.activities) : null;
	const climate = todayDay ? getClimate(todayDay.climateNormId) : null;

	const tripStart = itinerary[0].gregorianDate;
	const tripEnd = itinerary[itinerary.length - 1].gregorianDate;
	const beforeTrip = today < tripStart;
	const afterTrip = today > tripEnd;

	const daysUntilTrip = beforeTrip
		? Math.ceil((new Date(tripStart).getTime() - new Date(today).getTime()) / 86400000)
		: 0;
</script>

<svelte:head><title>Patuna Coklat-B — Hajj Companion</title></svelte:head>

<main class="mx-auto max-w-120 px-4 pt-safe space-y-4 py-5">

	<!-- ── Header ── -->
	<header class="flex items-center justify-between">
		<div>
			<p class="text-xs font-semibold tracking-widest text-(--color-brand) uppercase">
				Patuna Coklat-B
			</p>
			<h1 class="text-lg font-semibold text-foreground">Hajj Companion</h1>
		</div>
		{#if todayDay}
			<PhaseRibbon phase={todayDay.phase} label={PHASE_LABELS[todayDay.phase] ?? todayDay.phase} />
		{/if}
	</header>

	<!-- ══════════════════════════════════════
	     STATE 1: Before trip
	══════════════════════════════════════ -->
	{#if beforeTrip}
		<HeroCard phase="arrival">
			{#snippet label()}
				<p class="text-xs font-semibold tracking-widest text-white/70 uppercase">Keberangkatan</p>
			{/snippet}
			<p class="text-2xl font-semibold text-white">
				{daysUntilTrip} hari lagi
			</p>
			<p class="mt-1 text-sm text-white/80">Menuju Jakarta → Jeddah</p>
			<p class="mt-3 text-xs text-white/60">Senin, 11 Mei 2026 · Bandara T3 pukul 20:40</p>
		</HeroCard>

		<Card>
			<p class="text-sm font-semibold text-foreground">Manasik — Santika ICE BSD</p>
			<p class="mt-1 text-sm text-muted">9–11 Mei 2026 · Persiapan terakhir sebelum keberangkatan</p>
		</Card>

		<Card>
			<p class="text-xs font-semibold text-muted uppercase tracking-wide mb-2">Persiapan Haji</p>
			<ul class="space-y-1 text-sm text-foreground">
				<li>✓ Pastikan paspor & visa sudah di tangan</li>
				<li>✓ Cek koper: seragam batik Patuna, ihram, obat pribadi</li>
				<li>✓ Power bank di kabin (WAJIB — tidak boleh di koper)</li>
				<li>✓ Pelajari niat umrah & talbiyah</li>
			</ul>
		</Card>

	<!-- ══════════════════════════════════════
	     STATE 2: During trip — After Maghrib
	══════════════════════════════════════ -->
	{:else if todayDay && afterMaghrib && nextDay}
		<!-- Persiapan Besok card -->
		<HeroCard phase={nextDay.phase}>
			{#snippet label()}
				<p class="text-xs font-semibold tracking-widest text-white/70 uppercase">Persiapan Besok</p>
			{/snippet}
			<p class="text-xl font-semibold text-white">
				Hari {nextDay.dayNumber} — {nextDay.routeLabel}
			</p>
			<p class="mt-1 text-sm text-white/80">{nextDay.gregorianDate} · {nextDay.hijriDate}</p>
		</HeroCard>

		<!-- Tomorrow's key info -->
		<Card>
			<p class="text-xs font-semibold text-muted uppercase tracking-wide mb-2">Besok akan</p>
			<p class="text-sm text-foreground leading-relaxed">{nextDay.whatToDo}</p>
		</Card>

		{#if nextDay.whatToBring.length > 0}
			<Card>
				<p class="text-xs font-semibold text-muted uppercase tracking-wide mb-2">Bawa besok</p>
				<ul class="space-y-1">
					{#each nextDay.whatToBring as item}
						<li class="flex gap-2 text-sm text-foreground">
							<span class="text-(--color-brand) shrink-0">·</span>
							<span>{item}</span>
						</li>
					{/each}
				</ul>
			</Card>
		{/if}

		{#if nextDay.dressCode}
			<Card>
				<p class="text-xs font-semibold text-muted uppercase tracking-wide mb-2">Seragam besok</p>
				<div class="space-y-1 text-sm">
					<p><span class="text-muted">Pria:</span> {nextDay.dressCode.men}</p>
					<p><span class="text-muted">Wanita:</span> {nextDay.dressCode.women}</p>
				</div>
			</Card>
		{/if}

		{#if nextDay.koperNote}
			<Card>
				<p class="text-xs font-semibold text-(--color-brand) uppercase tracking-wide mb-1">Koper</p>
				<p class="text-sm text-foreground">{nextDay.koperNote}</p>
			</Card>
		{/if}

		<!-- Today card (secondary) -->
		<div class="border-t border-border pt-4">
			<p class="text-xs font-semibold text-muted uppercase tracking-wide mb-3">Hari ini</p>
			<Card>
				<p class="font-medium">Hari {todayDay.dayNumber} — {todayDay.location}</p>
				<p class="mt-1 text-sm text-muted">{todayDay.hijriDate}</p>
				<Button href="/itinerary/{todayDay.dayNumber}" variant="ghost" size="sm" class="mt-3 -ml-2">
					Lihat detail →
				</Button>
			</Card>
		</div>

	<!-- ══════════════════════════════════════
	     STATE 3: During trip — Daytime (Now/Next)
	══════════════════════════════════════ -->
	{:else if todayDay}
		<!-- NOW card -->
		<HeroCard phase={todayDay.phase}>
			{#snippet label()}
				<p class="text-xs font-semibold tracking-widest text-white/70 uppercase">
					Hari {todayDay.dayNumber} · {todayDay.hijriDate}
				</p>
			{/snippet}
			<p class="text-xl font-semibold text-white">{todayDay.routeLabel}</p>
			<p class="mt-1 text-sm text-white/80">{todayDay.location} · {todayDay.gregorianDate}</p>
		</HeroCard>

		<!-- What to do today -->
		<Card>
			<p class="text-xs font-semibold text-muted uppercase tracking-wide mb-2">Hari ini</p>
			<p class="text-sm text-foreground leading-relaxed">{todayDay.whatToDo}</p>
			<Button href="/itinerary/{todayDay.dayNumber}" variant="ghost" size="sm" class="mt-3 -ml-2">
				Jadwal lengkap →
			</Button>
		</Card>

		<!-- NEXT activity -->
		{#if nextActivity && nextActivity.time}
			{@const mins = minutesUntil(nextActivity.time)}
			<Card>
				<div class="flex items-start justify-between gap-3">
					<div class="min-w-0 flex-1">
						<p class="text-xs font-semibold text-muted uppercase tracking-wide">Selanjutnya</p>
						<p class="mt-1 font-medium text-foreground">{nextActivity.title}</p>
						{#if nextActivity.location}
							<p class="mt-0.5 text-sm text-muted">{nextActivity.location}</p>
						{/if}
					</div>
					<div class="shrink-0 text-right">
						<p class="text-sm font-semibold text-(--color-brand)">{nextActivity.time}</p>
						<p class="text-xs text-muted">{formatCountdown(mins)}</p>
					</div>
				</div>
			</Card>
		{/if}

		<!-- Climate strip -->
		{#if climate}
			<Card>
				<div class="flex items-center justify-between gap-3">
					<div class="min-w-0 flex-1">
						<p class="text-xs font-semibold text-muted uppercase tracking-wide">Cuaca Tipikal</p>
						<p class="mt-1 text-sm text-foreground leading-relaxed">{climate.advice}</p>
					</div>
					<div class="shrink-0 text-right">
						<p class="text-2xl font-semibold text-foreground">{climate.tempMaxC}°</p>
						<p class="text-xs text-muted">{climate.tempMinC}°–{climate.tempMaxC}°C</p>
					</div>
				</div>
			</Card>
		{/if}

		<!-- Tips -->
		{#if todayDay.tips.length > 0}
			<Card>
				<p class="text-xs font-semibold text-muted uppercase tracking-wide mb-2">Tips hari ini</p>
				<ul class="space-y-2">
					{#each todayDay.tips as tip}
						<li class="flex gap-2 text-sm text-foreground">
							<span class="text-gold shrink-0">·</span>
							<span>{tip}</span>
						</li>
					{/each}
				</ul>
			</Card>
		{/if}

		<!-- Ritual guide link (for critical days) -->
		{#if todayDay.ritualGuideId}
			<Card pressable href="/ritual/{todayDay.ritualGuideId}">
				<div class="flex items-center justify-between gap-3">
					<div>
						<p class="text-xs font-semibold text-(--color-brand) uppercase tracking-wide">Panduan Ritual</p>
						<p class="mt-1 font-medium text-foreground">Buka panduan langkah demi langkah →</p>
					</div>
					<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="shrink-0 text-(--color-brand)" aria-hidden="true">
						<polyline points="9 18 15 12 9 6"/>
					</svg>
				</div>
			</Card>
		{/if}

	<!-- ══════════════════════════════════════
	     STATE 4: After trip
	══════════════════════════════════════ -->
	{:else if afterTrip}
		<HeroCard phase="departure">
			{#snippet label()}
				<p class="text-xs font-semibold tracking-widest text-white/70 uppercase">Alhamdulillah</p>
			{/snippet}
			<p class="text-2xl font-semibold text-white">Haji Selesai</p>
			<p class="mt-2 text-sm text-white/80">Semoga menjadi haji yang mabrur. Amin.</p>
		</HeroCard>

		<Card>
			<p class="text-sm text-foreground">Kenangan perjalanan haji Anda tersimpan di bawah ini.</p>
			<Button href="/itinerary" variant="secondary" size="md" class="mt-3 w-full">
				Lihat Semua Jadwal
			</Button>
		</Card>
	{/if}

</main>
