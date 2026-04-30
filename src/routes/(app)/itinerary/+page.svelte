<script lang="ts">
	import { itinerary, getEffectiveToday, PHASE_LABELS } from '$lib/data/itinerary';
	import Card from '$lib/components/ui/Card.svelte';
	import { onMount } from 'svelte';
	import gsap from 'gsap';
	import {
		CaretRight,
		MapTrifold,
		AirplaneLanding,
		Mosque,
		MapPin,
		Buildings,
		Flag,
		CheckCircle,
		AirplaneTakeoff
	} from 'phosphor-svelte';
	import KaabaIcon from '$lib/components/ui/KaabaIcon.svelte';

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

	function getPhaseIcon(phase: string) {
		switch (phase) {
			case 'manasik':
				return MapTrifold;
			case 'arrival':
				return AirplaneLanding;
			case 'madinah':
				return Mosque;
			case 'madinah-to-makkah':
				return MapPin;
			case 'makkah':
				return Buildings;
			case 'ash-shishah':
				return Buildings;
			case 'rukun':
				return KaabaIcon;
			case 'post-hajj':
				return CheckCircle;
			case 'departure':
				return AirplaneTakeoff;
			default:
				return MapPin;
		}
	}

	function scrollToToday() {
		document.getElementById('today-row')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
	}

	let pageContainer: HTMLElement;

	onMount(() => {
		const items = pageContainer.querySelectorAll('.gsap-item');
		gsap.fromTo(
			items,
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
		class="gsap-item sticky top-0 z-30 flex items-center justify-between bg-background/80 pt-4 pb-3 backdrop-blur-md"
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
	<div class="mt-4 space-y-10">
		{#each groups as group}
			{@const PhaseIcon = getPhaseIcon(group.phase)}
			<div class="relative">
				<!-- Sticky Phase Header -->
				<div
					class="gsap-item sticky top-[68px] z-20 mb-4 flex items-center gap-3 bg-background/95 py-2 backdrop-blur-md"
				>
					<div
						class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-(--color-brand)/10 text-(--color-brand)"
					>
						<PhaseIcon size={20} weight="fill" />
					</div>
					<div>
						<h2 class="text-base font-bold text-foreground">
							{PHASE_LABELS[group.phase] ?? group.phase}
						</h2>
						<p class="text-xs font-medium text-muted">{phaseDayRange(group)}</p>
					</div>
				</div>

				<!-- Days List -->
				<div class="space-y-3">
					{#each group.days as day}
						{@const isToday = day.dayNumber === todayDayNumber}
						{@const isPast = today > day.gregorianDate}
						<Card
							pressable
							href="/itinerary/{day.dayNumber}"
							class="gsap-item group relative overflow-hidden"
						>
							<!-- Highlight bar for today -->
							{#if isToday}
								<div class="absolute inset-y-0 left-0 w-1.5 bg-(--color-brand)"></div>
							{/if}

							<div
								id={isToday ? 'today-row' : undefined}
								class="flex w-full items-center justify-between {isToday ? 'pl-2' : ''}"
							>
								<div class="flex flex-1 items-center gap-4 text-left">
									<!-- Custom day badge -->
									<div
										class="flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-2xl transition-all duration-300 group-hover:scale-110 group-hover:bg-(--color-brand) group-hover:text-surface
										{isToday
											? 'bg-(--color-brand) text-surface'
											: isPast
												? 'bg-muted/10 text-muted'
												: 'bg-(--color-brand)/10 text-(--color-brand)'}"
									>
										{#if day.phase === 'manasik'}
											<span class="text-xs leading-none font-bold uppercase">H-{dayBadge(day)}</span
											>
										{:else}
											<span class="text-[10px] leading-none font-medium uppercase opacity-80"
												>Hari</span
											>
											<span class="text-lg leading-none font-bold">{dayBadge(day)}</span>
										{/if}
									</div>

									<div class="flex-1">
										<div class="flex items-center gap-2">
											<p
												class="font-bold transition-colors duration-300 group-hover:text-(--color-brand) {isPast &&
												!isToday
													? 'text-muted'
													: 'text-foreground'}"
											>
												{day.phase === 'manasik' ? day.routeLabel : day.location}
											</p>
											{#if day.ritualGuideId}
												<span
													class="shrink-0 rounded bg-(--color-brand)/10 px-1.5 py-0.5 text-[9px] font-bold tracking-wide text-(--color-brand) uppercase"
													>Ritual</span
												>
											{/if}
										</div>
										<p class="mt-0.5 text-xs text-muted">
											{formatGregorian(day.gregorianDate)} · {day.hijriDate}
										</p>
									</div>
								</div>

								<div class="ml-4 flex shrink-0 flex-col items-end gap-1">
									{#if isToday}
										<span
											class="rounded-full bg-(--color-brand) px-2 py-0.5 text-[10px] font-bold tracking-wide text-surface uppercase shadow-sm"
											>Hari ini</span
										>
									{:else}
										<CaretRight
											size={20}
											weight="bold"
											class="text-muted/30 transition-all duration-300 group-hover:translate-x-1 group-hover:text-(--color-brand)"
											aria-hidden="true"
										/>
									{/if}
								</div>
							</div>
						</Card>
					{/each}
				</div>
			</div>
		{/each}
	</div>

	<!-- Footer note -->
	<p class="gsap-item mt-8 text-center text-xs text-muted">
		Program dapat berubah sesuai kondisi lapangan.<br />
		Hotel: Grand Plaza Badr (Madinah) · Marriott Jabal Omar (Makkah)
	</p>
</div>
