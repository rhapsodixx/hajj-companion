<script lang="ts">
	import {
		itinerary,
		getDayByDate,
		getEffectiveToday,
		PHASE_LABELS,
		getTransportType,
		stripMovementKeywords
	} from '$lib/data/itinerary';
	import { getClimate } from '$lib/data/climate';
	import HeroCard from '$lib/components/ui/HeroCard.svelte';
	import Card from '$lib/components/ui/Card.svelte';
	import PhaseRibbon from '$lib/components/ui/PhaseRibbon.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import { onMount } from 'svelte';
	import gsap from 'gsap';
	import {
		CaretRight,
		ListChecks,
		SuitcaseRolling,
		Suitcase,
		TShirt,
		Clock,
		CloudSun,
		Lightbulb,
		BookOpenText,
		CalendarCheck,
		CheckCircle,
		Archive,
		Target,
		Note,
		AirplaneInFlight,
		Train,
		Bus
	} from 'phosphor-svelte';

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
		const tl = gsap.timeline();

		const cards = pageContainer.querySelectorAll('.gsap-card, header');
		tl.fromTo(
			cards,
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

		const listItems = pageContainer.querySelectorAll('.gsap-list-item');
		if (listItems.length > 0) {
			tl.fromTo(
				listItems,
				{ x: -15, opacity: 0 },
				{
					x: 0,
					opacity: 1,
					duration: 0.5,
					stagger: 0.08,
					ease: 'back.out(1.1)'
				},
				'-=0.5'
			);
		}

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

		return () => {
			tl.kill();
		};
	});
</script>

<svelte:head><title>quwa</title></svelte:head>

<main
	bind:this={pageContainer}
	class="page-enter relative mx-auto max-w-120 space-y-4 overflow-hidden px-4 pt-[calc(env(safe-area-inset-top)+1rem)] pb-24"
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

	<!-- ── Header ── -->
	<header class="mb-6 flex items-center justify-between">
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
			<div class="mb-4 flex items-center gap-3">
				<div
					class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-(--color-brand)/10 text-(--color-brand)"
				>
					<CalendarCheck size={18} weight="fill" aria-hidden="true" />
				</div>
				<h2 class="text-sm font-bold text-foreground">Persiapan Akhir</h2>
			</div>
			<p class="text-sm font-bold text-foreground">Manasik — Santika ICE BSD</p>
			<p class="mt-1 text-xs text-muted">
				9–11 Mei 2026 · Persiapan terakhir sebelum keberangkatan
			</p>
		</Card>

		<Card class="gsap-card">
			<div class="mb-4 flex items-center gap-3">
				<div
					class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-(--color-brand)/10 text-(--color-brand)"
				>
					<SuitcaseRolling size={18} weight="fill" aria-hidden="true" />
				</div>
				<h2 class="text-sm font-bold text-foreground">Ceklis Keberangkatan</h2>
			</div>
			<ul class="space-y-3">
				<li class="gsap-list-item flex items-start gap-3 text-sm text-foreground">
					<CheckCircle
						size={18}
						weight="fill"
						class="mt-[2px] shrink-0 text-(--color-brand)"
						aria-hidden="true"
					/>
					<span class="leading-relaxed">Cek koper: seragam batik Patuna, ihram, obat pribadi</span>
				</li>
				<li class="gsap-list-item flex items-start gap-3 text-sm text-foreground">
					<CheckCircle
						size={18}
						weight="fill"
						class="mt-[2px] shrink-0 text-(--color-brand)"
						aria-hidden="true"
					/>
					<span class="leading-relaxed">Power bank di kabin (WAJIB — tidak boleh di koper)</span>
				</li>
				<li class="gsap-list-item flex items-start gap-3 text-sm text-foreground">
					<CheckCircle
						size={18}
						weight="fill"
						class="mt-[2px] shrink-0 text-(--color-brand)"
						aria-hidden="true"
					/>
					<span class="leading-relaxed">Pelajari niat umrah & talbiyah</span>
				</li>
			</ul>
		</Card>

		<!-- ══════════════════════════════════════
	     STATE 2: After Maghrib — "Persiapan Besok"
	══════════════════════════════════════ -->
	{:else if todayDay && afterMaghrib && nextDay}
		<HeroCard phase={nextDay.phase} class="gsap-card">
			{#snippet label()}
				<div class="flex items-center gap-2">
					<p class="text-xs font-semibold tracking-widest uppercase opacity-80">Persiapan Besok</p>
					<span
						class="rounded-full bg-surface/20 px-2 py-0.5 text-[10px] font-bold tracking-wide uppercase"
						>Besok</span
					>
				</div>
			{/snippet}
			<p class="mt-2 text-xl font-semibold">
				{nextDay.phase === 'manasik'
					? nextDay.routeLabel
					: `Hari ${nextDay.dayNumber} — ${nextDay.routeLabel}`}
			</p>
			<p class="mt-1 text-sm opacity-80">{nextDay.gregorianDate} · {nextDay.hijriDate}</p>
		</HeroCard>

		<!-- Tomorrow's key info -->
		<Card class="gsap-card">
			<div class="mb-4 flex items-center gap-3">
				<div
					class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-(--color-brand)/10 text-(--color-brand)"
				>
					<Target size={18} weight="fill" aria-hidden="true" />
				</div>
				<h2 class="text-sm font-bold text-foreground">Aktivitas Besok</h2>
			</div>
			<p class="text-sm leading-relaxed text-foreground">{nextDay.whatToDo}</p>
		</Card>

		{#if nextDay.whatToBring.length > 0}
			<Card class="gsap-card">
				<div class="mb-4 flex items-center gap-3">
					<div
						class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-(--color-brand)/10 text-(--color-brand)"
					>
						<ListChecks size={18} weight="fill" aria-hidden="true" />
					</div>
					<h2 class="text-sm font-bold text-foreground">Yang Perlu Dibawa</h2>
				</div>
				<ul class="space-y-3">
					{#each nextDay.whatToBring as item}
						<li class="gsap-list-item flex items-start gap-3 text-sm text-foreground">
							<CheckCircle
								size={18}
								weight="fill"
								class="mt-[2px] shrink-0 text-(--color-brand)"
								aria-hidden="true"
							/>
							<span class="leading-relaxed">{item}</span>
						</li>
					{/each}
				</ul>
			</Card>
		{/if}

		{#if nextDay.dressCode}
			<Card class="gsap-card">
				<div class="mb-4 flex items-center gap-3">
					<div
						class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-(--color-brand)/10 text-(--color-brand)"
					>
						<TShirt size={18} weight="fill" aria-hidden="true" />
					</div>
					<h2 class="text-sm font-bold text-foreground">Pakaian Besok</h2>
				</div>
				<div class="space-y-2 text-sm">
					<div class="flex items-start gap-2">
						<span class="w-14 shrink-0 font-medium text-muted">Pria</span>
						<span class="leading-relaxed text-foreground">{nextDay.dressCode.men}</span>
					</div>
					<div class="flex items-start gap-2">
						<span class="w-14 shrink-0 font-medium text-muted">Wanita</span>
						<span class="leading-relaxed text-foreground">{nextDay.dressCode.women}</span>
					</div>
				</div>
			</Card>
		{/if}

		{#if nextDay.koperNote}
			<Card class="gsap-card">
				<div class="mb-4 flex items-center gap-3">
					<div
						class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-(--color-brand)/10 text-(--color-brand)"
					>
						<SuitcaseRolling size={18} weight="fill" aria-hidden="true" />
					</div>
					<h2 class="text-sm font-bold text-foreground">Info Koper</h2>
				</div>
				<p class="text-sm leading-relaxed text-foreground">{nextDay.koperNote}</p>
			</Card>
		{/if}

		<!-- Today card (secondary) -->
		<div class="mt-6 border-t border-border/40 pt-5">
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
				<div class="flex items-center gap-2">
					<p class="text-xs font-semibold tracking-widest uppercase opacity-80">
						{todayDay.phase === 'manasik'
							? todayDay.routeLabel
							: `Hari ${todayDay.dayNumber} · ${todayDay.hijriDate}`}
					</p>
					<span
						class="rounded-full bg-surface/20 px-2 py-0.5 text-[10px] font-bold tracking-wide uppercase"
						>Hari ini</span
					>
				</div>
			{/snippet}
			<h1 class="mt-2 text-2xl font-semibold">{todayDay.routeLabel}</h1>
			<p class="mt-1 text-sm opacity-80">
				{todayDay.location} · {formatGregorian(todayDay.gregorianDate)}
			</p>
		</HeroCard>

		<!-- What to do today -->
		<Card class="gsap-card">
			<div class="mb-4 flex items-center gap-3">
				<div
					class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-(--color-brand)/10 text-(--color-brand)"
				>
					<Target size={18} weight="fill" aria-hidden="true" />
				</div>
				<h2 class="text-sm font-bold text-foreground">Aktivitas Hari Ini</h2>
			</div>
			<p class="text-sm leading-relaxed text-foreground">{todayDay.whatToDo}</p>
			<Button href="/itinerary/{todayDay.dayNumber}" variant="ghost" size="sm" class="mt-3 -ml-2">
				Jadwal lengkap →
			</Button>
		</Card>

		<!-- NEXT activity -->
		{#if nextActivity && nextActivity.time}
			{@const mins = minutesUntil(nextActivity.time)}
			{@const transportType = getTransportType(nextActivity)}
			<Card class="gsap-card">
				<div class="mb-4 flex items-center gap-3">
					<div
						class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-(--color-brand)/10 text-(--color-brand)"
					>
						<Clock size={18} weight="fill" aria-hidden="true" />
					</div>
					<h2 class="text-sm font-bold text-foreground">Setelah Ini</h2>
				</div>
				<div class="flex items-start justify-between gap-4">
					<div class="min-w-0 flex-1">
						<div class="flex flex-wrap items-center gap-2">
							<p class="font-medium text-foreground">
								{transportType ? stripMovementKeywords(nextActivity.title) : nextActivity.title}
							</p>
							{#if transportType}
								<span
									class="flex h-5 items-center justify-center rounded-sm bg-surface px-1.5 text-muted ring-1 ring-border/50"
									title={transportType}
								>
									{#if transportType === 'plane'}
										<AirplaneInFlight size={14} weight="fill" />
									{:else if transportType === 'train'}
										<Train size={14} weight="fill" />
									{:else if transportType === 'bus'}
										<Bus size={14} weight="fill" />
									{/if}
								</span>
							{/if}
						</div>
						{#if nextActivity.location}
							<p class="mt-0.5 text-sm text-muted">{nextActivity.location}</p>
						{/if}
					</div>
					<div class="shrink-0 text-right">
						<p class="text-2xl font-bold tracking-tight text-foreground">{nextActivity.time}</p>
						<p class="mt-0.5 text-xs font-medium text-(--color-brand)">{formatCountdown(mins)}</p>
					</div>
				</div>
			</Card>
		{/if}

		<!-- Climate strip -->
		{#if climate}
			<Card class="gsap-card">
				<div class="mb-4 flex items-center gap-3">
					<div
						class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-(--color-brand)/10 text-(--color-brand)"
					>
						<CloudSun size={18} weight="fill" aria-hidden="true" />
					</div>
					<h2 class="text-sm font-bold text-foreground">Info Cuaca · {climate.city}</h2>
				</div>
				<div class="flex items-start justify-between gap-4">
					<div class="min-w-0 flex-1">
						<p class="text-sm leading-relaxed text-foreground">{climate.advice}</p>
					</div>
					<div class="shrink-0 text-right">
						<p class="text-2xl font-bold tracking-tight text-foreground">{climate.tempMaxC}°</p>
						<p class="mt-0.5 text-xs font-medium text-muted">
							{climate.tempMinC}°–{climate.tempMaxC}°C
						</p>
					</div>
				</div>
			</Card>
		{/if}

		<!-- Tips -->
		{#if todayDay.tips.length > 0}
			<Card class="gsap-card">
				<div class="mb-4 flex items-center gap-3">
					<div
						class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-(--color-brand)/10 text-(--color-brand)"
					>
						<Lightbulb size={18} weight="fill" aria-hidden="true" />
					</div>
					<h2 class="text-sm font-bold text-foreground">Tips Hari Ini</h2>
				</div>
				<ul class="space-y-3">
					{#each todayDay.tips as tip}
						<li class="gsap-list-item flex items-start gap-3 text-sm text-foreground">
							<span class="bg-gold mt-2 h-1.5 w-1.5 shrink-0 rounded-full"></span>
							<span class="leading-relaxed">{tip}</span>
						</li>
					{/each}
				</ul>
			</Card>
		{/if}

		<!-- Koper note -->
		{#if todayDay.koperNote}
			<Card class="gsap-card">
				<div class="mb-3 flex items-center gap-2">
					<SuitcaseRolling
						size={18}
						class="text-(--color-brand)"
						weight="bold"
						aria-hidden="true"
					/>
					<h2 class="text-xs font-semibold tracking-wide text-muted uppercase">Info Koper</h2>
				</div>
				<p class="text-sm leading-relaxed text-foreground">{todayDay.koperNote}</p>
			</Card>
		{/if}

		<!-- Ritual guide link (for critical days) -->
		{#if todayDay.ritualGuideId}
			<Card pressable href="/ritual/{todayDay.ritualGuideId}" class="gsap-card group">
				<div class="flex items-center justify-between gap-4">
					<div class="flex items-center gap-3">
						<div
							class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-(--color-brand)/10 text-(--color-brand) transition-colors duration-300 group-hover:bg-(--color-brand) group-hover:text-surface"
						>
							<BookOpenText size={20} weight="fill" aria-hidden="true" />
						</div>
						<div>
							<p class="text-sm font-bold text-foreground">Panduan Ibadah</p>
							<p class="mt-0.5 text-xs leading-relaxed text-muted">
								Buka panduan langkah demi langkah
							</p>
						</div>
					</div>
					<CaretRight
						size={20}
						weight="bold"
						class="shrink-0 text-muted/30 transition-all duration-300 group-hover:translate-x-1 group-hover:text-(--color-brand)"
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
			<div class="mb-4 flex items-center gap-3">
				<div
					class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-(--color-brand)/10 text-(--color-brand)"
				>
					<Archive size={18} weight="fill" aria-hidden="true" />
				</div>
				<h2 class="text-sm font-bold text-foreground">Arsip Perjalanan</h2>
			</div>
			<p class="text-sm font-medium text-foreground">Perjalanan haji telah selesai.</p>
			<p class="mt-1 text-xs text-muted">Seluruh jadwal tersimpan di bawah ini.</p>
			<Button href="/itinerary" variant="secondary" size="md" class="mt-3 w-full">
				Lihat Semua Jadwal
			</Button>
		</Card>
	{/if}
</main>
