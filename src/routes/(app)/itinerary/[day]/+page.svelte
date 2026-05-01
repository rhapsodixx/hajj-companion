<script lang="ts">
	import { browser } from '$app/environment';
	import { page } from '$app/state';
	import {
		itinerary,
		getDay,
		PHASE_LABELS,
		getTransportType,
		stripMovementKeywords
	} from '$lib/data/itinerary';
	import { getDuaByIds } from '$lib/data/dua';
	import { getClimate } from '$lib/data/climate';
	import {
		CaretLeft,
		CaretRight,
		Info,
		Clock,
		Target,
		CalendarBlank,
		TShirt,
		SuitcaseRolling,
		ListChecks,
		Lightbulb,
		CloudSun,
		HandsPraying,
		Note,
		CheckCircle,
		Bus,
		AirplaneTilt,
		Train,
		ArrowDown,
		BookOpenText
	} from 'phosphor-svelte';
	import { getOverrideForDay } from '$lib/state/overrides.svelte';
	import Card from '$lib/components/ui/Card.svelte';
	import HeroCard from '$lib/components/ui/HeroCard.svelte';
	import ArabicText from '$lib/components/ui/ArabicText.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import { onMount } from 'svelte';
	import gsap from 'gsap';

	const dayNumber = $derived(page.params?.day ? parseInt(page.params.day, 10) : 0);
	const day = $derived(getDay(dayNumber));
	const duas = $derived(day ? getDuaByIds(day.duaIds) : []);
	const climate = $derived(day ? getClimate(day.climateNormId) : null);
	const dayIndex = $derived(day ? itinerary.indexOf(day) : -1);
	const prevDay = $derived(dayIndex > 0 ? itinerary[dayIndex - 1] : null);
	const nextDayEntry = $derived(
		dayIndex >= 0 && dayIndex < itinerary.length - 1 ? itinerary[dayIndex + 1] : null
	);

	const bus = $derived(browser ? (localStorage.getItem('patuna-bus') ?? '18') : '18');
	const dayOverrides = $derived(day ? getOverrideForDay(day.dayNumber, bus) : []);
	const departureOverride = $derived(dayOverrides.find((o) => o.field === 'departureTime'));
	const noteOverride = $derived(dayOverrides.find((o) => o.field === 'note'));

	function formatGregorian(iso: string): string {
		const d = new Date(iso + 'T00:00:00');
		return d.toLocaleDateString('id-ID', {
			weekday: 'long',
			day: 'numeric',
			month: 'long',
			year: 'numeric'
		});
	}

	function dayTitle(d: (typeof itinerary)[0]): string {
		return d.phase === 'manasik' ? d.routeLabel : `Hari ${d.dayNumber} — ${d.routeLabel}`;
	}

	function navLabel(d: (typeof itinerary)[0]): string {
		return d.phase === 'manasik' ? d.routeLabel : `Hari ${d.dayNumber}`;
	}

	let pageContainer: HTMLElement | undefined = $state();
	let isBlipping = $state(false);

	let duaSectionEl: HTMLElement | undefined = $state();
	let floatingBtnEl: HTMLElement | undefined = $state();
	let isDuaVisible = $state(false);

	let currentSaudiDateStr = $state('');
	let currentSaudiTimeStr = $state('');

	const overrideDate = browser ? localStorage.getItem('patuna-date-override') : null;
	const isToday = $derived(
		day && currentSaudiDateStr ? day.gregorianDate === (overrideDate || currentSaudiDateStr) : false
	);

	const activeIndices = $derived.by(() => {
		if (!isToday || !currentSaudiTimeStr || !day || day.activities.length === 0) return [];

		let activeEffectiveTime: string | null = null;
		let lastTime = '00:00';

		for (let i = 0; i < day.activities.length; i++) {
			const t = day.activities[i].time;
			if (t) lastTime = t;

			if (lastTime <= currentSaudiTimeStr) {
				activeEffectiveTime = lastTime;
			} else {
				break;
			}
		}

		if (!activeEffectiveTime) return [];

		const indices: number[] = [];
		let currentEffective = '00:00';
		for (let i = 0; i < day.activities.length; i++) {
			const t = day.activities[i].time;
			if (t) currentEffective = t;
			if (currentEffective === activeEffectiveTime) {
				indices.push(i);
			}
		}

		return indices;
	});

	const firstActiveIndex = $derived(activeIndices[0]);

	$effect(() => {
		if (firstActiveIndex !== undefined) {
			isBlipping = true;
			const timer = setTimeout(() => {
				isBlipping = false;
			}, 3000);
			return () => clearTimeout(timer);
		}
	});

	function scrollToDua() {
		duaSectionEl?.scrollIntoView({ behavior: 'smooth', block: 'start' });
	}

	$effect(() => {
		if (!floatingBtnEl) return;
		if (isDuaVisible) {
			gsap.to(floatingBtnEl, {
				y: 20,
				opacity: 0,
				scale: 0.9,
				duration: 0.3,
				ease: 'power2.in',
				onComplete: () => {
					if (floatingBtnEl) floatingBtnEl.style.visibility = 'hidden';
				}
			});
		} else {
			floatingBtnEl.style.visibility = 'visible';
			gsap.to(floatingBtnEl, {
				y: 0,
				opacity: 1,
				scale: 1,
				duration: 0.5,
				ease: 'back.out(1.7)'
			});
		}
	});

	onMount(() => {
		const updateTime = () => {
			const now = new Date();

			const parts = new Intl.DateTimeFormat('en-US', {
				timeZone: 'Asia/Riyadh',
				year: 'numeric',
				month: '2-digit',
				day: '2-digit'
			}).formatToParts(now);
			const year = parts.find((p) => p.type === 'year')?.value;
			const month = parts.find((p) => p.type === 'month')?.value;
			const dayPart = parts.find((p) => p.type === 'day')?.value;
			if (year && month && dayPart) {
				currentSaudiDateStr = `${year}-${month}-${dayPart}`;
			}

			currentSaudiTimeStr = new Intl.DateTimeFormat('en-GB', {
				timeZone: 'Asia/Riyadh',
				hour: '2-digit',
				minute: '2-digit'
			}).format(now);
		};
		updateTime();
		const interval = setInterval(updateTime, 60000);

		if (!pageContainer) {
			return () => clearInterval(interval);
		}

		const tl = gsap.timeline();

		const cards = pageContainer.querySelectorAll('.gsap-card');
		tl.fromTo(
			cards,
			{ y: 40, opacity: 0, scale: 0.98 },
			{
				y: 0,
				opacity: 1,
				scale: 1,
				duration: 0.6,
				stagger: 0.08,
				ease: 'power3.out'
			}
		);

		const listItems = pageContainer.querySelectorAll('.gsap-list-item');
		if (listItems.length > 0) {
			tl.fromTo(
				listItems,
				{ x: -10, opacity: 0 },
				{
					x: 0,
					opacity: 1,
					duration: 0.4,
					stagger: 0.05,
					ease: 'power2.out'
				},
				'-=0.4'
			);
		}

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

		let observer: IntersectionObserver | undefined;
		if (duaSectionEl) {
			observer = new IntersectionObserver(
				(entries) => {
					const entry = entries[0];
					isDuaVisible = entry.isIntersecting;
				},
				{ threshold: 0.15 }
			);
			observer.observe(duaSectionEl);

			if (floatingBtnEl) {
				gsap.set(floatingBtnEl, { y: 20, opacity: 0, scale: 0.9 });
				gsap.to(floatingBtnEl, {
					y: 0,
					opacity: 1,
					scale: 1,
					duration: 0.5,
					delay: 0.8,
					ease: 'back.out(1.7)'
				});
			}
		}

		return () => {
			clearInterval(interval);
			tl.kill();
			observer?.disconnect();
		};
	});
</script>

<svelte:head>
	<title
		>{day
			? `${day.phase === 'manasik' ? day.routeLabel : `Hari ${day.dayNumber}`} — ${day.location} · Patuna Coklat-B`
			: 'Jadwal — Patuna Coklat-B'}</title
	>
</svelte:head>

{#if day}
	<div bind:this={pageContainer} class="page-enter relative mx-auto max-w-120 overflow-hidden">
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

		<!-- Back nav -->
		<div class="gsap-card px-4 pt-[calc(env(safe-area-inset-top)+1rem)] pb-2">
			<a href="/itinerary" class="tap-target inline-flex items-center gap-1 text-sm text-muted">
				<CaretLeft size={16} weight="bold" aria-hidden="true" />
				Jadwal
			</a>
		</div>

		<!-- Hero -->
		<div class="px-4 pb-4">
			<HeroCard phase={day.phase} class="gsap-card">
				{#snippet label()}
					<div class="flex items-center gap-2">
						<p class="text-xs font-semibold tracking-widest uppercase opacity-80">
							{PHASE_LABELS[day.phase] ?? day.phase}
						</p>
						{#if isToday}
							<span
								class="rounded-full bg-surface px-2 py-0.5 text-[10px] font-bold tracking-wide text-foreground uppercase"
								>Hari ini</span
							>
						{/if}
					</div>
				{/snippet}

				<h1 class="mt-2 text-2xl leading-tight font-semibold">
					{dayTitle(day)}
				</h1>
				<p class="mt-1.5 text-sm opacity-80">{formatGregorian(day.gregorianDate)}</p>
				<p class="mt-0.5 text-sm opacity-80">{day.hijriDate}</p>
			</HeroCard>
		</div>

		<!-- Content -->
		<div class="space-y-4 px-4 pb-6">
			<!-- Ritual guide shortcut (critical days) -->
			{#if day.ritualGuideId}
				<Card pressable href="/ritual/{day.ritualGuideId}" class="gsap-card group">
					<div class="flex w-full items-center justify-between">
						<div class="flex flex-1 items-center gap-4 text-left">
							<div
								class="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-muted/10 text-foreground transition-all duration-300 group-hover:scale-110 group-hover:bg-(--color-brand) group-hover:text-surface"
							>
								<BookOpenText size={24} weight="regular" aria-hidden="true" />
							</div>
							<div class="flex-1">
								<p class="text-xs font-semibold tracking-wide text-(--color-brand) uppercase">
									Panduan Ibadah
								</p>
								<p
									class="mt-0.5 font-bold text-foreground transition-colors duration-300 group-hover:text-(--color-brand)"
								>
									Buka panduan langkah demi langkah
								</p>
								<p class="mt-0.5 text-xs text-muted">Niat, tawaf, doa, dan tips penting</p>
							</div>
						</div>
						<CaretRight
							size={20}
							weight="bold"
							class="ml-4 shrink-0 text-muted/30 transition-all duration-300 group-hover:translate-x-1 group-hover:text-(--color-brand)"
							aria-hidden="true"
						/>
					</div>
				</Card>
			{/if}

			<!-- Dynamic override note -->
			{#if noteOverride}
				<Card class="gsap-card">
					<div class="flex items-start gap-2">
						<span class="text-gold mt-0.5 shrink-0">
							<Info size={14} weight="bold" aria-hidden="true" />
						</span>
						<div class="min-w-0 flex-1">
							<p class="text-sm leading-relaxed font-medium text-foreground">
								{noteOverride.value}
							</p>
							<p class="mt-1 text-xs text-muted">Diperbarui oleh {noteOverride.publishedBy}</p>
						</div>
					</div>
				</Card>
			{/if}

			<!-- What to do -->
			<Card class="gsap-card">
				<div class="mb-3 flex items-center gap-2">
					<Target size={18} class="text-(--color-brand)" weight="bold" aria-hidden="true" />
					<h2 class="text-xs font-semibold tracking-wide text-muted uppercase">
						Aktivitas Hari Ini
					</h2>
				</div>
				<p class="text-sm leading-relaxed text-foreground">{day.whatToDo}</p>
			</Card>

			<!-- Departure override -->
			{#if departureOverride}
				<Card class="gsap-card">
					<div class="flex items-center gap-2">
						<Clock
							size={14}
							weight="bold"
							class="shrink-0 text-(--color-brand)"
							aria-hidden="true"
						/>
						<div class="min-w-0 flex-1">
							<p class="text-sm font-medium text-foreground">
								Waktu berangkat diperbarui: <span class="font-semibold text-(--color-brand)"
									>{departureOverride.value}</span
								>
							</p>
							<p class="mt-0.5 text-xs text-muted">
								Diperbarui oleh {departureOverride.publishedBy}
							</p>
						</div>
					</div>
				</Card>
			{/if}

			<!-- Timeline -->
			{#if day.activities.length > 0}
				<div class="gsap-card">
					<div class="mb-3 flex items-center gap-2 px-1">
						<CalendarBlank
							size={18}
							class="text-(--color-brand)"
							weight="bold"
							aria-hidden="true"
						/>
						<h2 class="text-xs font-semibold tracking-wide text-muted uppercase">Jadwal</h2>
					</div>
					<div class="overflow-hidden rounded-xl border border-border">
						{#each day.activities as activity, i}
							{@const isActive = activeIndices.includes(i)}
							{@const transportType = getTransportType(activity)}
							<div
								class="gsap-list-item relative flex gap-3 px-4 py-3 {i > 0
									? 'border-t border-border'
									: ''} bg-surface transition-colors duration-500"
							>
								{#if isActive}
									<div class="absolute inset-0 bg-(--color-brand) opacity-[0.08]"></div>
									<div class="absolute top-0 bottom-0 left-0 w-1 bg-(--color-brand)"></div>
								{/if}
								<!-- Time -->
								<div class="relative w-12 shrink-0 pt-0.5">
									{#if activity.time}
										<span
											class="text-xs font-semibold {isActive
												? 'text-(--color-brand)'
												: 'text-(--color-brand)/80'} tabular-nums">{activity.time}</span
										>
									{:else}
										<span class="text-xs text-muted">—</span>
									{/if}
								</div>
								<!-- Activity -->
								<div class="relative min-w-0 flex-1">
									<div class="flex items-start gap-2">
										<p
											class="flex-1 text-sm leading-tight font-medium {isActive
												? 'text-(--color-brand)'
												: 'text-foreground'}"
										>
											{transportType ? stripMovementKeywords(activity.title) : activity.title}
										</p>
										{#if transportType}
											<span
												class="mt-0.5 inline-flex shrink-0 items-center justify-center rounded bg-(--color-brand)/10 p-1 text-(--color-brand)"
											>
												{#if transportType === 'plane'}
													<AirplaneTilt size={12} weight="bold" aria-hidden="true" />
												{:else if transportType === 'train'}
													<Train size={12} weight="bold" aria-hidden="true" />
												{:else}
													<Bus size={12} weight="bold" aria-hidden="true" />
												{/if}
											</span>
										{/if}
										{#if activity.conditional}
											<span
												class="mt-0.5 shrink-0 rounded border {isActive
													? 'border-(--color-brand)/30 text-(--color-brand)'
													: 'border-border text-muted'} px-1 py-0.5 text-[9px] font-bold tracking-wide uppercase"
												>Waktu Fleksibel</span
											>
										{/if}
										{#if isActive && i === activeIndices[0]}
											<span class="mt-0.5 flex h-2 w-2 shrink-0 items-center justify-center">
												{#if isBlipping}
													<span
														class="absolute inline-flex h-full w-full animate-ping rounded-full bg-(--color-brand) opacity-75"
													></span>
												{/if}
												<span
													class="relative inline-flex h-1.5 w-1.5 rounded-full bg-(--color-brand)"
												></span>
											</span>
										{/if}
									</div>
									{#if activity.location}
										<p class="mt-0.5 text-xs {isActive ? 'text-(--color-brand)/80' : 'text-muted'}">
											{activity.location}
										</p>
									{/if}
									<p
										class="mt-1 text-xs leading-snug {isActive ? 'text-foreground' : 'text-muted'}"
									>
										{transportType
											? stripMovementKeywords(activity.description)
											: activity.description}
									</p>
								</div>
							</div>
						{/each}
					</div>
				</div>
			{/if}

			<!-- Dress code -->
			{#if day.dressCode}
				<Card class="gsap-card">
					<div class="mb-3 flex items-center gap-2">
						<TShirt size={18} class="text-(--color-brand)" weight="bold" aria-hidden="true" />
						<h2 class="text-xs font-semibold tracking-wide text-muted uppercase">Pakaian</h2>
					</div>
					<div class="space-y-2 text-sm">
						<div class="flex items-start gap-2">
							<span class="w-14 shrink-0 font-medium text-muted">Pria</span>
							<span class="leading-relaxed text-foreground">{day.dressCode.men}</span>
						</div>
						<div class="flex items-start gap-2">
							<span class="w-14 shrink-0 font-medium text-muted">Wanita</span>
							<span class="leading-relaxed text-foreground">{day.dressCode.women}</span>
						</div>
					</div>
				</Card>
			{/if}

			<!-- Koper note -->
			{#if day.koperNote}
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
					<p class="text-sm leading-relaxed text-foreground">{day.koperNote}</p>
				</Card>
			{/if}

			<!-- What to bring -->
			{#if day.whatToBring.length > 0}
				<Card class="gsap-card">
					<div class="mb-3 flex items-center gap-2">
						<ListChecks size={18} class="text-(--color-brand)" weight="bold" aria-hidden="true" />
						<h2 class="text-xs font-semibold tracking-wide text-muted uppercase">
							Yang Perlu Dibawa
						</h2>
					</div>
					<ul class="space-y-2">
						{#each day.whatToBring as item}
							<li class="gsap-list-item flex items-start gap-2 text-sm text-foreground">
								<CheckCircle
									size={16}
									weight="fill"
									class="mt-0.5 shrink-0 text-muted"
									aria-hidden="true"
								/>
								<span class="leading-relaxed">{item}</span>
							</li>
						{/each}
					</ul>
				</Card>
			{/if}

			<!-- Tips -->
			{#if day.tips.length > 0}
				<Card class="gsap-card">
					<div class="mb-3 flex items-center gap-2">
						<Lightbulb size={18} class="text-(--color-brand)" weight="bold" aria-hidden="true" />
						<h2 class="text-xs font-semibold tracking-wide text-muted uppercase">Tips</h2>
					</div>
					<ul class="space-y-2.5">
						{#each day.tips as tip}
							<li class="gsap-list-item flex items-start gap-2.5 text-sm text-foreground">
								<span class="bg-gold mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"></span>
								<span class="leading-relaxed">{tip}</span>
							</li>
						{/each}
					</ul>
				</Card>
			{/if}

			<!-- Climate -->
			{#if climate}
				<Card class="gsap-card">
					<div class="mb-3 flex items-center gap-2">
						<CloudSun size={18} class="text-(--color-brand)" weight="bold" aria-hidden="true" />
						<h2 class="text-xs font-semibold tracking-wide text-muted uppercase">
							Info Cuaca · {climate.city}
						</h2>
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

			<!-- Du'a of the day -->
			{#if duas.length > 0}
				<div bind:this={duaSectionEl} id="dua-section" class="gsap-card">
					<div class="mb-3 flex items-center gap-2 px-1">
						<HandsPraying size={18} class="text-(--color-brand)" weight="bold" aria-hidden="true" />
						<h2 class="text-xs font-semibold tracking-wide text-muted uppercase">Doa Hari Ini</h2>
					</div>
					<div class="space-y-3">
						{#each duas as dua}
							<Card class="gsap-list-item">
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
				<Card class="gsap-card">
					<div class="mb-3 flex items-center gap-2">
						<Note size={18} class="text-(--color-brand)" weight="bold" aria-hidden="true" />
						<h2 class="text-xs font-semibold tracking-wide text-muted uppercase">Catatan Patuna</h2>
					</div>
					<p class="text-sm leading-relaxed text-foreground">{day.patunaNote}</p>
				</Card>
			{/if}

			<!-- Prev / Next navigation -->
			<div class="flex gap-3 pt-2">
				{#if prevDay}
					<Button
						href="/itinerary/{prevDay.dayNumber}"
						variant="secondary"
						size="md"
						class="flex-1"
					>
						← {navLabel(prevDay)}
					</Button>
				{:else}
					<div class="flex-1"></div>
				{/if}
				{#if nextDayEntry}
					<Button
						href="/itinerary/{nextDayEntry.dayNumber}"
						variant="secondary"
						size="md"
						class="flex-1"
					>
						{navLabel(nextDayEntry)} →
					</Button>
				{:else}
					<div class="flex-1"></div>
				{/if}
			</div>

			<!-- Floating dua anchor button -->
			{#if duas.length > 0}
				<!-- Desktop alignment wrapper -->
				<div
					class="pointer-events-none fixed inset-x-0 z-50 mx-auto max-w-120"
					style="bottom: calc(var(--spacing-nav-height) + env(safe-area-inset-bottom, 0px) + 0.5rem)"
				>
					<div
						bind:this={floatingBtnEl}
						class="absolute right-4 bottom-0 {isDuaVisible
							? 'pointer-events-none'
							: 'pointer-events-auto'}"
					>
						<button
							onclick={scrollToDua}
							class="tap-target pointer-events-auto flex items-center gap-2 rounded-pill border border-border bg-surface px-4 py-3 text-sm font-semibold text-foreground shadow-level-3 transition-transform duration-100 ease-out active:scale-[0.98]"
							aria-label="Lompat ke bagian doa hari ini"
						>
							<HandsPraying size={18} weight="bold" aria-hidden="true" />
							Doa
							<ArrowDown size={14} weight="bold" aria-hidden="true" />
						</button>
					</div>
				</div>
			{/if}
		</div>
	</div>
{:else}
	<div class="mx-auto max-w-120 px-4 pt-[calc(env(safe-area-inset-top)+1rem)] pb-12 text-center">
		<p class="text-muted">Hari tidak ditemukan.</p>
		<Button href="/itinerary" variant="ghost" size="md" class="mt-4">← Kembali ke Jadwal</Button>
	</div>
{/if}
