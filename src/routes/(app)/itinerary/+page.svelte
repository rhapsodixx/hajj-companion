<script lang="ts">
	import { itinerary, getEffectiveToday, PHASE_LABELS } from '$lib/data/itinerary';
	import PhaseRibbon from '$lib/components/ui/PhaseRibbon.svelte';
	import { onMount } from 'svelte';
	import gsap from 'gsap';
	import { CaretRight } from 'phosphor-svelte';

	const PHASE_ORDER = [
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

	const today = getEffectiveToday();
	const todayDayNumber = itinerary.find((d) => d.gregorianDate === today)?.dayNumber;

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

	function dayBadge(day: (typeof itinerary)[0]): string {
		if (day.phase === 'manasik') {
			return String(Math.abs(day.dayNumber + 2) + 1);
		}
		return day.dayNumber.toString();
	}

	function phaseDayRange(group: PhaseGroup): string {
		if (group.phase === 'manasik') {
			const first = formatGregorian(group.days[0].gregorianDate);
			const last = formatGregorian(group.days[group.days.length - 1].gregorianDate);
			return `${first} – ${last}`;
		}
		const d0 = group.days[0].dayNumber;
		const dN = group.days[group.days.length - 1].dayNumber;
		return dN > d0 ? `Hari ${d0}–${dN}` : `Hari ${d0}`;
	}

	function scrollToToday() {
		document.getElementById('today-row')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
	}

	let pageContainer: HTMLElement;

	onMount(() => {
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

<svelte:head><title>Jadwal — Patuna Coklat-B</title></svelte:head>

<div
	bind:this={pageContainer}
	class="page-enter relative mx-auto max-w-120 overflow-hidden px-4 pt-[calc(env(safe-area-inset-top)+1rem)] pb-24"
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

	<!-- Header -->
	<div
		class="gsap-card sticky top-0 z-10 flex items-center justify-between bg-background/80 pt-4 pb-3 backdrop-blur-md"
	>
		<div>
			<h1 class="text-xl font-semibold">Jadwal Perjalanan</h1>
			<p class="mt-0.5 text-xs text-muted">Manasik + 26 hari · Coklat B · 1447 H</p>
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
			<div class="gsap-card">
				<div class="mb-2 flex items-center gap-3">
					<PhaseRibbon phase={group.phase} label={PHASE_LABELS[group.phase] ?? group.phase} />
					<span class="text-xs text-muted">{phaseDayRange(group)}</span>
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
									? 'bg-(--color-brand) text-background'
									: isPast
										? 'bg-border text-muted'
										: 'bg-border/60 text-foreground'}"
							>
								{dayBadge(day)}
							</div>

							<!-- Content -->
							<div class="min-w-0 flex-1">
								<div class="flex items-baseline gap-2">
									<p
										class="truncate text-sm leading-tight font-medium
										{isPast && !isToday ? 'text-muted' : 'text-foreground'}"
									>
										{day.phase === 'manasik' ? day.routeLabel : day.location}
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
									<CaretRight size={16} weight="bold" class="text-border" aria-hidden="true" />
								{/if}
							</div>
						</a>
					{/each}
				</div>
			</div>
		{/each}
	</div>

	<!-- Footer note -->
	<p class="gsap-card mt-6 text-center text-xs text-muted">
		Program dapat berubah sesuai kondisi lapangan.<br />
		Hotel: Grand Plaza Badr (Madinah) · Marriott Jabal Omar (Makkah)
	</p>
</div>
