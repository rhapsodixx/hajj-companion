<script lang="ts">
	import { page } from '$app/state';
	import { getDua, duaLibrary } from '$lib/data/dua';
	import ArabicText from '$lib/components/ui/ArabicText.svelte';
	import Card from '$lib/components/ui/Card.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import PageBackground from '$lib/components/ui/PageBackground.svelte';
	import { CaretLeft, BookOpenText, HandsPraying, Copy, Check } from 'phosphor-svelte';
	import { onMount } from 'svelte';
	import gsap from 'gsap';

	const duaId = $derived(page.params?.id ?? '');
	const dua = $derived(getDua(duaId));

	// Find prev/next dua for navigation
	const duaIndex = $derived(dua ? duaLibrary.findIndex((d) => d.id === dua.id) : -1);
	const prevDua = $derived(duaIndex > 0 ? duaLibrary[duaIndex - 1] : null);
	const nextDua = $derived(
		duaIndex >= 0 && duaIndex < duaLibrary.length - 1 ? duaLibrary[duaIndex + 1] : null
	);

	const CATEGORY_LABELS: Record<string, string> = {
		niat: 'Niat & Talbiyah',
		masjid: 'Masjid',
		tawaf: 'Tawaf',
		sai: "Sa'i",
		wukuf: 'Wukuf & Arafah',
		jumrah: 'Lontar Jumrah',
		safar: 'Perjalanan',
		umum: 'Umum'
	};

	let copied = $state(false);
	let pageContainer: HTMLElement | undefined = $state();

	function copyArabic() {
		if (!dua) return;
		navigator.clipboard.writeText(dua.arabic).then(() => {
			copied = true;
			setTimeout(() => (copied = false), 2000);
		});
	}

	onMount(() => {
		if (!pageContainer) return;

		const tl = gsap.timeline();

		// Animate hero
		const hero = pageContainer.querySelector('.gsap-hero');
		if (hero) {
			tl.fromTo(
				hero,
				{ y: 30, opacity: 0 },
				{ y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' }
			);
		}

		// Animate content cards with stagger
		const cards = pageContainer.querySelectorAll('.gsap-card');
		if (cards.length > 0) {
			tl.fromTo(
				cards,
				{ y: 40, opacity: 0, scale: 0.98 },
				{
					y: 0,
					opacity: 1,
					scale: 1,
					duration: 0.6,
					stagger: 0.1,
					ease: 'power3.out'
				},
				'-=0.3'
			);
		}

		// Animate Arabic text with a special entrance
		const arabicBlock = pageContainer.querySelector('.gsap-arabic');
		if (arabicBlock) {
			tl.fromTo(
				arabicBlock,
				{ y: 20, opacity: 0, scale: 0.96 },
				{ y: 0, opacity: 1, scale: 1, duration: 0.7, ease: 'back.out(1.4)' },
				'-=0.4'
			);
		}

		return () => {
			tl.kill();
		};
	});
</script>

<svelte:head>
	<title>{dua ? `${dua.title} — Patuna Coklat-B` : 'Doa — Patuna Coklat-B'}</title>
</svelte:head>

{#if dua}
	<div bind:this={pageContainer} class="page-enter relative mx-auto max-w-120 overflow-hidden pb-5">
		<PageBackground />

		<!-- Back nav -->
		<div class="px-4 pt-[calc(env(safe-area-inset-top)+1rem)] pb-2">
			<a href="/dua" class="tap-target inline-flex items-center gap-1 text-sm text-muted">
				<CaretLeft size={16} weight="bold" aria-hidden="true" />
				Kumpulan Doa
			</a>
		</div>

		<!-- Hero Card -->
		<div class="gsap-hero px-4 pb-4">
			<div
				class="card-enter relative overflow-hidden rounded-xl bg-foreground p-5 text-surface shadow-level-1"
			>
				<div class="relative z-10">
					<p class="text-xs font-semibold tracking-widest uppercase opacity-80">
						{CATEGORY_LABELS[dua.category] ?? dua.category}
					</p>
					<h1 class="mt-2 text-2xl leading-tight font-semibold">{dua.title}</h1>
					<p class="mt-2 text-sm leading-relaxed opacity-80">{dua.whenToRead}</p>
				</div>
			</div>
		</div>

		<!-- Content -->
		<div class="space-y-4 px-4 pb-6">
			<!-- Arabic text block -->
			<Card class="gsap-arabic">
				<div class="mb-3 flex items-center justify-between gap-2">
					<div class="flex items-center gap-2">
						<HandsPraying size={18} class="text-(--color-brand)" weight="bold" aria-hidden="true" />
						<h2 class="text-xs font-semibold tracking-wide text-muted uppercase">Lafaz Doa</h2>
					</div>
					<button
						onclick={copyArabic}
						class="tap-target flex h-9 w-9 items-center justify-center rounded-full text-muted transition-colors hover:bg-black/5 dark:hover:bg-white/5"
						aria-label="Salin teks Arab"
					>
						{#if copied}
							<Check size={18} weight="bold" class="text-(--color-brand)" />
						{:else}
							<Copy size={18} weight="regular" />
						{/if}
					</button>
				</div>
				<div class="rounded-xl bg-[var(--color-accent-light)] p-5">
					<ArabicText text={dua.arabic} size="lg" />
				</div>
			</Card>

			<!-- Latin transliteration -->
			<Card class="gsap-card">
				<h2 class="mb-3 text-xs font-semibold tracking-wide text-muted uppercase">
					Transliterasi Latin
				</h2>
				<p class="text-sm leading-relaxed text-foreground italic">{dua.latin}</p>
			</Card>

			<!-- Translation -->
			<Card class="gsap-card">
				<h2 class="mb-3 text-xs font-semibold tracking-wide text-muted uppercase">Terjemah</h2>
				<p class="text-base leading-relaxed text-foreground">{dua.translation}</p>
			</Card>

			<!-- Source attribution -->
			{#if dua.sources}
				<Card class="gsap-card">
					<div class="flex items-start gap-3">
						<BookOpenText
							size={18}
							class="mt-0.5 shrink-0 text-(--color-brand)"
							weight="bold"
							aria-hidden="true"
						/>
						<div class="min-w-0 flex-1">
							<h2 class="text-xs font-semibold tracking-wide text-muted uppercase">Sumber</h2>
							<p class="mt-1 text-sm leading-relaxed text-foreground">{dua.sources}</p>
						</div>
					</div>
				</Card>
			{/if}

			<!-- Prev / Next navigation -->
			<div class="flex gap-3 pt-2">
				{#if prevDua}
					<Button href="/dua/{prevDua.id}" variant="secondary" size="md" class="flex-1">
						← Sebelumnya
					</Button>
				{:else}
					<div class="flex-1"></div>
				{/if}
				{#if nextDua}
					<Button href="/dua/{nextDua.id}" variant="secondary" size="md" class="flex-1">
						Selanjutnya →
					</Button>
				{:else}
					<div class="flex-1"></div>
				{/if}
			</div>
		</div>
	</div>
{:else}
	<div class="mx-auto max-w-120 px-4 pt-[calc(env(safe-area-inset-top)+1rem)] pb-12 text-center">
		<p class="text-muted">Doa tidak ditemukan.</p>
		<Button href="/dua" variant="ghost" size="md" class="mt-4">← Kembali ke Kumpulan Doa</Button>
	</div>
{/if}
