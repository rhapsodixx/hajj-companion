<script lang="ts">
	import { ritualGuides } from '$lib/data/ritual';
	import { PHASE_LABELS } from '$lib/data/itinerary';
	import Card from '$lib/components/ui/Card.svelte';
	import KaabaIcon from '$lib/components/ui/KaabaIcon.svelte';
	import { onMount } from 'svelte';
	import gsap from 'gsap';
	import {
		CaretLeft,
		CaretRight,
		BookOpenText,
		MapPin,
		Mosque,
		Buildings,
		CheckCircle,
		AirplaneTakeoff,
		MapTrifold,
		AirplaneLanding
	} from 'phosphor-svelte';

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

	type PhaseGroup = { phase: string; guides: typeof ritualGuides };
	const groups: PhaseGroup[] = [];
	for (const phase of PHASE_ORDER) {
		const guides = ritualGuides.filter((g) => g.phase === phase);
		if (guides.length > 0) groups.push({ phase, guides });
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

	let pageContainer: HTMLElement | undefined = $state();

	onMount(() => {
		if (!pageContainer) return;

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

<svelte:head>
	<title>Panduan Ritual — Patuna Coklat-B</title>
</svelte:head>

<div
	bind:this={pageContainer}
	class="page-enter relative mx-auto min-h-dvh max-w-120 overflow-hidden px-4 pt-[calc(env(safe-area-inset-top)+1rem)] pb-24"
>
	<!-- Pastel Background Pattern -->
	<div class="pointer-events-none fixed inset-0 z-[-1] overflow-hidden bg-background">
		<div class="app-bg absolute inset-0 opacity-[0.03]"></div>
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
			<h1 class="text-xl font-semibold">Panduan Ritual</h1>
			<p class="mt-0.5 text-xs text-muted">Langkah demi langkah haji dan umrah</p>
		</div>
		<a
			href="/"
			class="tap-target flex items-center gap-1 rounded-lg border border-border bg-surface px-3 py-1.5 text-xs font-semibold text-(--color-brand)"
		>
			<CaretLeft size={14} weight="bold" />
			Kembali
		</a>
	</div>

	<div class="relative z-10 mt-4 space-y-10">
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
						<p class="text-xs font-medium text-muted">{group.guides.length} Panduan</p>
					</div>
				</div>

				<div class="space-y-3">
					{#each group.guides as guide}
						<Card
							pressable
							href="/ritual/{guide.id}"
							class="gsap-item group relative overflow-hidden"
						>
							<div class="flex w-full items-center justify-between">
								<div class="flex flex-1 items-start gap-4 text-left">
									<div
										class="mt-0.5 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-(--color-brand)/10 text-(--color-brand) transition-all duration-300 group-hover:scale-110 group-hover:bg-(--color-brand) group-hover:text-surface"
									>
										<BookOpenText
											size={24}
											weight="fill"
											class="transition-colors duration-300"
											aria-hidden="true"
										/>
									</div>
									<div class="flex-1">
										<p
											class="mb-1 text-[10px] font-bold tracking-widest text-(--color-brand) uppercase"
										>
											{guide.subtitle}
										</p>
										<h3
											class="text-lg leading-tight font-bold text-foreground transition-colors duration-300 group-hover:text-(--color-brand)"
										>
											{guide.title}
										</h3>
										<p class="mt-1.5 line-clamp-2 text-sm leading-relaxed text-muted">
											{guide.overview}
										</p>
									</div>
								</div>
								<div class="ml-4 flex shrink-0 flex-col items-end gap-1">
									<CaretRight
										size={20}
										weight="bold"
										class="text-muted/30 transition-all duration-300 group-hover:translate-x-1 group-hover:text-(--color-brand)"
										aria-hidden="true"
									/>
								</div>
							</div>
						</Card>
					{/each}
				</div>
			</div>
		{/each}
	</div>
</div>
