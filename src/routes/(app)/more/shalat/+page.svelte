<script lang="ts">
	import { ritualGuides } from '$lib/data/ritual';
	import Card from '$lib/components/ui/Card.svelte';
	import { onMount } from 'svelte';
	import gsap from 'gsap';
	import { CaretLeft, CaretRight, Clock, Mosque } from 'phosphor-svelte';

	const shalatGuides = ritualGuides.filter((g) => g.phase === 'shalat');

	let pageContainer: HTMLElement | undefined = $state();

	onMount(() => {
		if (!pageContainer) return;

		const cards = pageContainer.querySelectorAll('.gsap-card');
		gsap.fromTo(
			cards,
			{ y: 60, opacity: 0, scale: 0.95 },
			{
				y: 0,
				opacity: 1,
				scale: 1,
				duration: 0.8,
				stagger: 0.07,
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
	<title>Panduan Shalat — Patuna Coklat-B</title>
</svelte:head>

<div
	bind:this={pageContainer}
	class="page-enter relative mx-auto max-w-120 overflow-hidden px-4 pt-[calc(env(safe-area-inset-top)+1rem)] pb-5"
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
	<div class="gsap-card pt-4 pb-3">
		<a href="/more" class="tap-target inline-flex items-center gap-1 text-sm text-muted">
			<CaretLeft size={16} weight="bold" />
			Lainnya
		</a>
		<h1 class="mt-2 text-xl font-semibold">Panduan Shalat</h1>
		<p class="mt-0.5 text-xs text-muted">Shalat sunnah & tata caranya</p>
	</div>

	<div class="mt-6 space-y-3">
		{#each shalatGuides as guide}
			<Card pressable href="/ritual/{guide.id}" class="gsap-card group">
				<div class="flex w-full items-center justify-between">
					<div class="flex flex-1 items-start gap-4 text-left">
						<div
							class="mt-0.5 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-(--color-brand)/10 text-(--color-brand) transition-all duration-300 group-hover:scale-110 group-hover:bg-(--color-brand) group-hover:text-surface"
						>
							<Mosque size={24} weight="fill" class="transition-colors duration-300" />
						</div>
						<div class="flex-1">
							<h3
								class="text-base font-bold text-foreground transition-colors duration-300 group-hover:text-(--color-brand)"
							>
								{guide.title}
							</h3>
							{#if guide.timing}
								<div class="mt-1.5 flex items-start gap-1.5">
									<Clock
										size={13}
										weight="fill"
										class="mt-0.5 shrink-0 text-(--color-brand)/70"
										aria-hidden="true"
									/>
									<p class="text-xs leading-relaxed text-muted">{guide.timing}</p>
								</div>
							{/if}
						</div>
					</div>
					<CaretRight
						size={18}
						weight="bold"
						class="ml-4 shrink-0 text-muted/30 transition-all duration-300 group-hover:translate-x-1 group-hover:text-(--color-brand)"
						aria-hidden="true"
					/>
				</div>
			</Card>
		{/each}
	</div>
</div>
