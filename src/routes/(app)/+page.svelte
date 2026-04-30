<script lang="ts">
	import { itinerary, getDayByDate, getEffectiveToday, PHASE_LABELS } from '$lib/data/itinerary';
	import { getClimate } from '$lib/data/climate';
	import HeroCard from '$lib/components/ui/HeroCard.svelte';
	import Card from '$lib/components/ui/Card.svelte';
	import PhaseRibbon from '$lib/components/ui/PhaseRibbon.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import { onMount } from 'svelte';
	import gsap from 'gsap';
	import { CaretRight } from 'phosphor-svelte';

	let nowTick = $state(Date.now());
	$effect(() => {
		const id = setInterval(() => (nowTick = Date.now()), 60_000);
		return () => clearInterval(id);
	});

	const today = getEffectiveToday();
	const todayDay = getDayByDate(today);
	const climate = todayDay ? getClimate(todayDay.climateNormId) : null;

	const hajjStart =
		itinerary.find((d) => d.dayNumber === 1)?.gregorianDate ?? itinerary[0].gregorianDate;
	const tripEnd = itinerary[itinerary.length - 1].gregorianDate;
	const beforeTrip = !todayDay && today < hajjStart;
	const afterTrip = !todayDay && today > tripEnd;

	const daysUntilTrip = beforeTrip
		? Math.ceil((new Date(hajjStart).getTime() - new Date(today).getTime()) / 86400000)
		: 0;

	let afterMaghrib = $derived.by(() => {
		const _ = nowTick;
		const h = new Date().getHours();
		return h >= 18 || h < 4;
	});

	let nextDay = $derived.by(() => {
		if (!todayDay) return null;
		const idx = itinerary.findIndex((d) => d.gregorianDate === today);
		return idx >= 0 && idx < itinerary.length - 1 ? itinerary[idx + 1] : null;
	});

	let nextActivity = $derived.by(() => {
		const _ = nowTick;
		if (!todayDay) return null;
		const now = new Date();
		const hhmm = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
		const timed = todayDay.activities.filter((a) => a.time);
		return timed.find((a) => (a.time ?? '') > hhmm) ?? timed[timed.length - 1] ?? null;
	});

	function minutesUntil(timeStr: string): number {
		const _ = nowTick;
		const [hh, mm] = timeStr.split(':').map(Number);
		const now = new Date();
		// eslint-disable-next-line svelte/prefer-svelte-reactivity
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

	function formatGregorian(iso: string): string {
		const d = new Date(iso + 'T00:00:00');
		return d.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long' });
	}

	let pageContainer: HTMLElement;

	onMount(() => {
		// Playful entry animation for all cards
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
				stagger: 0.1,
				ease: 'back.out(1.2)'
			}
		);

		// Animate background shapes
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

<svelte:head><title>quwa</title></svelte:head>

<main
	bind:this={pageContainer}
	class="relative mx-auto max-w-120 space-y-6 overflow-hidden px-4 pt-[calc(env(safe-area-inset-top)+1rem)] pb-24"
>
	<!-- Background Playful Shapes -->
	<div class="pointer-events-none fixed inset-0 z-[-1] overflow-hidden">
		<div
			class="gsap-shape absolute top-[-5%] left-[-10%] h-64 w-64 rounded-full bg-[var(--color-pastel-green)] opacity-30 mix-blend-multiply blur-3xl"
		></div>
		<div
			class="gsap-shape absolute top-[20%] right-[-10%] h-80 w-80 rounded-full bg-[var(--color-pastel-blue)] opacity-30 mix-blend-multiply blur-3xl"
		></div>
		<div
			class="gsap-shape absolute bottom-[10%] left-[20%] h-72 w-72 rounded-full bg-[var(--color-pastel-yellow)] opacity-30 mix-blend-multiply blur-3xl"
		></div>
	</div>

	<!-- ── Header ── -->
	<header class="gsap-card flex items-center justify-between">
		<div class="flex items-center gap-3">
			<img src="/logo.png" alt="quwa logo" class="h-8 w-8 object-contain" />
			<h1 class="text-xl font-bold tracking-tight text-foreground">quwa</h1>
		</div>
		{#if todayDay}
			<PhaseRibbon phase={todayDay.phase} label={PHASE_LABELS[todayDay.phase] ?? todayDay.phase} />
		{/if}
	</header>

	<!-- ══════════════════════════════════════
	     STATE 1: Before trip (no matching day)
	══════════════════════════════════════ -->
	{#if beforeTrip}
		<HeroCard phase="arrival" class="gsap-card">
			{#snippet label()}
				<p class="text-xs font-semibold tracking-widest uppercase opacity-80">Keberangkatan</p>
			{/snippet}
			<p class="text-2xl font-semibold">
				{daysUntilTrip} hari lagi
			</p>
			<p class="mt-1 text-sm opacity-80">Menuju Jakarta → Jeddah</p>
			<p class="mt-3 text-xs opacity-80">Senin, 11 Mei 2026 · Bandara T3 pukul 20:40</p>
		</HeroCard>

		<Card class="gsap-card">
			<p class="text-sm font-semibold text-foreground">Manasik — Santika ICE BSD</p>
			<p class="mt-1 text-sm text-muted">
				9–11 Mei 2026 · Persiapan terakhir sebelum keberangkatan
			</p>
		</Card>

		<Card class="gsap-card">
			<p class="mb-2 text-xs font-semibold tracking-wide text-muted uppercase">Persiapan Haji</p>
			<ul class="space-y-1 text-sm text-foreground">
				<li>✓ Cek koper: seragam batik Patuna, ihram, obat pribadi</li>
				<li>✓ Power bank di kabin (WAJIB — tidak boleh di koper)</li>
				<li>✓ Pelajari niat umrah & talbiyah</li>
			</ul>
		</Card>

		<!-- ══════════════════════════════════════
	     STATE 2: After Maghrib — "Persiapan Besok"
	══════════════════════════════════════ -->
	{:else if todayDay && afterMaghrib && nextDay}
		<HeroCard phase={nextDay.phase} class="gsap-card">
			{#snippet label()}
				<p class="text-xs font-semibold tracking-widest uppercase opacity-80">Persiapan Besok</p>
			{/snippet}
			<p class="text-xl font-semibold">
				{nextDay.phase === 'manasik'
					? nextDay.routeLabel
					: `Hari ${nextDay.dayNumber} — ${nextDay.routeLabel}`}
			</p>
			<p class="mt-1 text-sm opacity-80">{nextDay.gregorianDate} · {nextDay.hijriDate}</p>
		</HeroCard>

		<!-- Tomorrow's key info -->
		<Card class="gsap-card">
			<p class="mb-2 text-xs font-semibold tracking-wide text-muted uppercase">Aktivitas besok</p>
			<p class="text-sm leading-relaxed text-foreground">{nextDay.whatToDo}</p>
		</Card>

		{#if nextDay.whatToBring.length > 0}
			<Card class="gsap-card">
				<p class="mb-2 text-xs font-semibold tracking-wide text-muted uppercase">
					Yang perlu dibawa
				</p>
				<ul class="space-y-1">
					{#each nextDay.whatToBring as item}
						<li class="flex gap-2 text-sm text-foreground">
							<span class="shrink-0 text-(--color-brand)">·</span>
							<span>{item}</span>
						</li>
					{/each}
				</ul>
			</Card>
		{/if}

		{#if nextDay.dressCode}
			<Card class="gsap-card">
				<p class="mb-2 text-xs font-semibold tracking-wide text-muted uppercase">Pakaian besok</p>
				<div class="space-y-1 text-sm">
					<p><span class="text-muted">Pria:</span> {nextDay.dressCode.men}</p>
					<p><span class="text-muted">Wanita:</span> {nextDay.dressCode.women}</p>
				</div>
			</Card>
		{/if}

		{#if nextDay.koperNote}
			<Card class="gsap-card">
				<p class="mb-1 text-xs font-semibold tracking-wide text-(--color-brand) uppercase">
					Info Koper
				</p>
				<p class="text-sm text-foreground">{nextDay.koperNote}</p>
			</Card>
		{/if}

		<!-- Today card (secondary) -->
		<div class="border-t border-border/40 pt-5">
			<p class="mb-3 text-xs font-semibold tracking-wide text-muted uppercase">Hari ini</p>
			<Card class="gsap-card">
				<p class="font-medium">
					{todayDay.phase === 'manasik'
						? todayDay.routeLabel
						: `Hari ${todayDay.dayNumber} — ${todayDay.location}`}
				</p>
				<p class="mt-1 text-sm text-muted">{todayDay.hijriDate}</p>
				<Button href="/itinerary/{todayDay.dayNumber}" variant="ghost" size="sm" class="mt-3 -ml-2">
					Lihat jadwal lengkap →
				</Button>
			</Card>
		</div>

		<!-- ══════════════════════════════════════
	     STATE 3: Daytime (Now/Next)
	══════════════════════════════════════ -->
	{:else if todayDay}
		<!-- NOW card -->
		<HeroCard phase={todayDay.phase} class="gsap-card">
			{#snippet label()}
				<p class="text-xs font-semibold tracking-widest uppercase opacity-80">
					{todayDay.phase === 'manasik'
						? todayDay.routeLabel
						: `Hari ${todayDay.dayNumber} · ${todayDay.hijriDate}`}
				</p>
			{/snippet}
			<p class="text-xl font-semibold">{todayDay.routeLabel}</p>
			<p class="mt-1 text-sm opacity-80">
				{todayDay.location} · {formatGregorian(todayDay.gregorianDate)}
			</p>
		</HeroCard>

		<!-- What to do today -->
		<Card class="gsap-card">
			<p class="mb-2 text-xs font-semibold tracking-wide text-muted uppercase">
				Aktivitas hari ini
			</p>
			<p class="text-sm leading-relaxed text-foreground">{todayDay.whatToDo}</p>
			<Button href="/itinerary/{todayDay.dayNumber}" variant="ghost" size="sm" class="mt-3 -ml-2">
				Jadwal lengkap →
			</Button>
		</Card>

		<!-- NEXT activity -->
		{#if nextActivity && nextActivity.time}
			{@const mins = minutesUntil(nextActivity.time)}
			<Card class="gsap-card">
				<div class="flex items-start justify-between gap-3">
					<div class="min-w-0 flex-1">
						<p class="text-xs font-semibold tracking-wide text-muted uppercase">Setelah ini</p>
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
			<Card class="gsap-card">
				<div class="flex items-center justify-between gap-3">
					<div class="min-w-0 flex-1">
						<p class="text-xs font-semibold tracking-wide text-muted uppercase">Info Cuaca</p>
						<p class="mt-1 text-sm leading-relaxed text-foreground">{climate.advice}</p>
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
			<Card class="gsap-card">
				<p class="mb-2 text-xs font-semibold tracking-wide text-muted uppercase">Tips hari ini</p>
				<ul class="space-y-2">
					{#each todayDay.tips as tip}
						<li class="flex gap-2 text-sm text-foreground">
							<span class="shrink-0 text-(--color-brand)">·</span>
							<span>{tip}</span>
						</li>
					{/each}
				</ul>
			</Card>
		{/if}

		<!-- Koper note -->
		{#if todayDay.koperNote}
			<Card class="gsap-card">
				<p class="mb-1 text-xs font-semibold tracking-wide text-(--color-brand) uppercase">
					Info Koper
				</p>
				<p class="text-sm text-foreground">{todayDay.koperNote}</p>
			</Card>
		{/if}

		<!-- Ritual guide link (for critical days) -->
		{#if todayDay.ritualGuideId}
			<Card pressable href="/ritual/{todayDay.ritualGuideId}" class="gsap-card">
				<div class="flex items-center justify-between gap-3">
					<div>
						<p class="text-xs font-semibold tracking-wide text-(--color-brand) uppercase">
							Panduan Ritual
						</p>
						<p class="mt-1 font-medium text-foreground">Buka panduan langkah demi langkah →</p>
					</div>
					<CaretRight
						size={20}
						weight="bold"
						class="shrink-0 text-(--color-brand)"
						aria-hidden="true"
					/>
				</div>
			</Card>
		{/if}

		<!-- ══════════════════════════════════════
	     STATE 4: After trip
	══════════════════════════════════════ -->
	{:else if afterTrip}
		<HeroCard phase="departure" class="gsap-card">
			{#snippet label()}
				<p class="text-xs font-semibold tracking-widest uppercase opacity-80">Alhamdulillah</p>
			{/snippet}
			<p class="text-2xl font-semibold">Haji Selesai</p>
			<p class="mt-2 text-sm opacity-80">Semoga menjadi haji yang mabrur. Amin.</p>
		</HeroCard>

		<Card class="gsap-card">
			<p class="text-sm text-foreground">Kenangan perjalanan haji tersimpan di bawah ini.</p>
			<Button href="/itinerary" variant="secondary" size="md" class="mt-3 w-full">
				Lihat Semua Jadwal
			</Button>
		</Card>
	{/if}
</main>
