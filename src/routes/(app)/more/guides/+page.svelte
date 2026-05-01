<script lang="ts">
	import Card from '$lib/components/ui/Card.svelte';
	import { onMount } from 'svelte';
	import gsap from 'gsap';
	import { CaretLeft, CaretRight, FilePdf, Link } from 'phosphor-svelte';

	interface Guide {
		title: string;
		description: string;
		url: string;
		size: string;
		icon: 'pdf' | 'link';
		offline?: boolean;
	}

	const guides: Guide[] = [
		{
			title: 'Rundown Manasik Coklat B',
			description: 'Jadwal lengkap manasik di ICE BSD, 9–11 Mei 2026',
			url: '/pdfs/rundown-manasik.pdf',
			size: '56 KB',
			icon: 'pdf',
			offline: true
		},
		{
			title: 'Itinerary Haji 2026 — Coklat B',
			description: 'Jadwal 26 hari keberangkatan haji Patuna Coklat B',
			url: '/pdfs/itinerary-coklat-b.pdf',
			size: '106 KB',
			icon: 'pdf',
			offline: true
		},
		{
			title: 'Panduan Persiapan Jamaah Haji',
			description: 'Panduan lengkap persiapan dari Patuna Travel',
			url: '/pdfs/panduan-persiapan.pdf',
			size: '330 KB',
			icon: 'pdf',
			offline: true
		},
		{
			title: 'Dokumen Pendukung Manasik',
			description: 'Dokumen tambahan untuk manasik di Santika ICE BSD',
			url: '/pdfs/dokumen-pendukung-manasik.pdf',
			size: '626 KB',
			icon: 'pdf',
			offline: true
		},
		{
			title: 'Manasik Haji Sesuai Sunnah',
			description: 'Buku panduan manasik haji karya Dr. Abdullah Roy',
			url: '/pdfs/manasik-haji-sesuai-sunnah.pdf',
			size: '1.8 MB',
			icon: 'pdf',
			offline: true
		},
		{
			title: 'Kumpulan Doa di Arafah',
			description: 'Panduan dan kumpulan doa saat wukuf di Arafah',
			url: '/pdfs/kumpulan-doa-di-arafah.pdf',
			size: '3.5 MB',
			icon: 'pdf',
			offline: true
		},
		{
			title: 'Doa Zikir Haji & Umrah',
			description: 'Kumpulan doa dan zikir untuk ibadah haji dan umrah',
			url: 'https://drive.google.com/file/d/1PLrAgbFMv-Fg_O8ufU1VKw_RlLMrNlSB/view',
			size: '44.7 MB',
			icon: 'link'
		}
	];

	let pageContainer: HTMLElement | undefined = $state();

	onMount(() => {
		if (!pageContainer) return;
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

<svelte:head><title>Panduan PDF — Patuna Coklat-B</title></svelte:head>

<div
	bind:this={pageContainer}
	class="page-enter relative mx-auto max-w-120 overflow-hidden px-4 pt-[calc(env(safe-area-inset-top)+1rem)] pb-8"
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
	<div class="gsap-card pt-4 pb-3">
		<a href="/more" class="tap-target inline-flex items-center gap-1 text-sm text-muted">
			<CaretLeft size={16} weight="bold" aria-hidden="true" />
			Lainnya
		</a>
		<h1 class="mt-2 text-xl font-semibold">Panduan PDF</h1>
		<p class="mt-0.5 text-xs text-muted">Unduh panduan untuk akses offline</p>
	</div>

	<div class="space-y-2">
		{#each guides as guide}
			<Card pressable href={guide.url} class="gsap-card group">
				<div class="flex w-full items-center justify-between">
					<div class="flex flex-1 items-center gap-4 text-left">
						<!-- PDF icon -->
						<div
							class="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-muted/10 text-foreground transition-all duration-300 group-hover:scale-110 group-hover:bg-brand group-hover:text-surface"
						>
							{#if guide.icon === 'pdf'}
								<FilePdf
									size={24}
									weight="regular"
									class="transition-colors duration-300 group-hover:text-surface"
									aria-hidden="true"
								/>
							{:else}
								<Link
									size={24}
									weight="regular"
									class="transition-colors duration-300 group-hover:text-surface"
									aria-hidden="true"
								/>
							{/if}
						</div>
						<div class="flex-1">
							<p
								class="font-bold text-foreground transition-colors duration-300 group-hover:text-brand"
							>
								{guide.title}
							</p>
							<p class="mt-0.5 text-sm text-muted">{guide.description}</p>
							<div class="mt-1 flex items-center gap-2">
								<p class="text-xs font-medium text-muted">{guide.size}</p>
								{#if guide.offline}
									<span
										class="rounded-full bg-(--color-brand)/10 px-1.5 py-0.5 text-[10px] font-bold tracking-wide text-(--color-brand) uppercase"
										>Offline</span
									>
								{/if}
							</div>
						</div>
					</div>
					<CaretRight
						size={20}
						weight="bold"
						class="ml-4 shrink-0 text-muted/30 transition-all duration-300 group-hover:translate-x-1 group-hover:text-brand"
						aria-hidden="true"
					/>
				</div>
			</Card>
		{/each}
	</div>

	<p class="gsap-card mt-6 text-center text-xs text-muted">
		Panduan bertanda "Tersedia offline" bisa dibuka tanpa internet setelah pertama kali dibuka.
	</p>
</div>
