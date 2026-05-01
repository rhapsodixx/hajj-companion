<script lang="ts">
	import Card from '$lib/components/ui/Card.svelte';
	import { onMount } from 'svelte';
	import gsap from 'gsap';
	import { PhoneCall, BookOpenText, Gear, CaretRight, ListChecks, Mosque } from 'phosphor-svelte';

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

<svelte:head><title>Lainnya — Patuna Coklat-B</title></svelte:head>

<div
	bind:this={pageContainer}
	class="page-enter relative mx-auto max-w-120 overflow-hidden px-4 pt-[calc(env(safe-area-inset-top)+1rem)] pb-5"
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

	<div class="gsap-card mt-2 mb-8">
		<h1 class="text-3xl font-extrabold tracking-tight text-foreground">Lainnya</h1>
		<p class="mt-2 text-sm text-muted">Akses informasi tambahan dan pengaturan aplikasi.</p>
	</div>

	<div class="mt-8 space-y-4">
		<Card pressable href="/more/contacts" class="gsap-card group">
			<div class="flex w-full items-center justify-between">
				<div class="flex flex-1 items-center gap-4 text-left">
					<div
						class="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-muted/10 text-foreground transition-all duration-300 group-hover:scale-110 group-hover:bg-brand group-hover:text-surface"
					>
						<PhoneCall size={24} weight="regular" />
					</div>
					<div class="flex-1">
						<p
							class="font-bold text-foreground transition-colors duration-300 group-hover:text-brand"
						>
							Kontak Penting
						</p>
						<p class="mt-0.5 text-sm text-muted">Tim bus, hotel, darurat, konsuler</p>
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

		<Card pressable href="/more/guides" class="gsap-card group">
			<div class="flex w-full items-center justify-between">
				<div class="flex flex-1 items-center gap-4 text-left">
					<div
						class="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-muted/10 text-foreground transition-all duration-300 group-hover:scale-110 group-hover:bg-brand group-hover:text-surface"
					>
						<BookOpenText size={24} weight="regular" />
					</div>
					<div class="flex-1">
						<p
							class="font-bold text-foreground transition-colors duration-300 group-hover:text-brand"
						>
							Panduan PDF
						</p>
						<p class="mt-0.5 text-sm text-muted">Buku panduan & materi manasik</p>
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

		<Card pressable href="/ritual" class="gsap-card group">
			<div class="flex w-full items-center justify-between">
				<div class="flex flex-1 items-center gap-4 text-left">
					<div
						class="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-muted/10 text-foreground transition-all duration-300 group-hover:scale-110 group-hover:bg-brand group-hover:text-surface"
					>
						<ListChecks size={24} weight="regular" />
					</div>
					<div class="flex-1">
						<p
							class="font-bold text-foreground transition-colors duration-300 group-hover:text-brand"
						>
							Daftar Ritual
						</p>
						<p class="mt-0.5 text-sm text-muted">Daftar lengkap urutan dan panduan ibadah</p>
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

		<Card pressable href="/more/shalat" class="gsap-card group">
			<div class="flex w-full items-center justify-between">
				<div class="flex flex-1 items-center gap-4 text-left">
					<div
						class="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-muted/10 text-foreground transition-all duration-300 group-hover:scale-110 group-hover:bg-brand group-hover:text-surface"
					>
						<Mosque size={24} weight="regular" />
					</div>
					<div class="flex-1">
						<p
							class="font-bold text-foreground transition-colors duration-300 group-hover:text-brand"
						>
							Panduan Shalat
						</p>
						<p class="mt-0.5 text-sm text-muted">Rawatib, jenazah, dhuha, dan shalat sunnah</p>
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

		<Card pressable href="/more/settings" class="gsap-card group">
			<div class="flex w-full items-center justify-between">
				<div class="flex flex-1 items-center gap-4 text-left">
					<div
						class="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-muted/10 text-foreground transition-all duration-300 group-hover:scale-110 group-hover:bg-brand group-hover:text-surface"
					>
						<Gear size={24} weight="regular" />
					</div>
					<div class="flex-1">
						<p
							class="font-bold text-foreground transition-colors duration-300 group-hover:text-brand"
						>
							Pengaturan
						</p>
						<p class="mt-0.5 text-sm text-muted">Tema, nomor bus, preferensi</p>
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
	</div>
</div>
