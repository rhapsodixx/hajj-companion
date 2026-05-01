<script lang="ts">
	import { contacts } from '$lib/data/contacts';
	import Card from '$lib/components/ui/Card.svelte';
	import PhoneButton from '$lib/components/ui/PhoneButton.svelte';
	import WhatsAppButton from '$lib/components/ui/WhatsAppButton.svelte';
	import { onMount } from 'svelte';
	import gsap from 'gsap';
	import { CaretLeft } from 'phosphor-svelte';

	type ContactCat = 'muthawwif' | 'patuna' | 'hotel' | 'emergency' | 'consulate';

	const SECTION_ORDER: { category: ContactCat; label: string }[] = [
		{ category: 'muthawwif', label: 'Tim Bus 18' },
		{ category: 'patuna', label: 'Patuna Ops' },
		{ category: 'hotel', label: 'Hotel' },
		{ category: 'emergency', label: 'Darurat' },
		{ category: 'consulate', label: 'Konsuler' }
	];

	function getByCategory(cat: ContactCat) {
		return contacts.filter((c) => c.category === cat);
	}

	function hasPhone(c: (typeof contacts)[number]): boolean {
		return !!(c.phone || c.whatsapp);
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

<svelte:head><title>Kontak Penting — Patuna Coklat-B</title></svelte:head>

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

	<!-- Header -->
	<div class="gsap-card pt-4 pb-3">
		<a href="/more" class="tap-target inline-flex items-center gap-1 text-sm text-muted">
			<CaretLeft size={16} weight="bold" />
			Lainnya
		</a>
		<h1 class="mt-2 text-xl font-semibold">Kontak Penting</h1>
		<p class="mt-0.5 text-xs text-muted">Tim Bus 18, hotel, darurat, konsuler</p>
	</div>

	<div class="space-y-6">
		{#each SECTION_ORDER as section}
			{@const items = getByCategory(section.category)}
			{#if items.length > 0}
				<div>
					<p class="gsap-card mb-2 text-[10px] font-bold tracking-widest text-muted uppercase">
						{section.label}
					</p>
					<div class="space-y-2">
						{#each items as contact}
							<Card class="gsap-card">
								<div class="flex items-start justify-between gap-3">
									<div class="min-w-0 flex-1">
										<p class="text-sm font-semibold text-foreground">{contact.name}</p>
										<p class="mt-0.5 text-xs text-muted">{contact.role}</p>
										{#if contact.note}
											<p class="mt-1 text-xs text-muted italic">{contact.note}</p>
										{/if}
										{#if contact.address}
											<p class="mt-1.5 text-xs text-foreground">{contact.address}</p>
										{/if}
										{#if contact.addressArabic}
											<p class="mt-1 text-sm text-foreground" lang="ar" dir="rtl">
												{contact.addressArabic}
											</p>
										{/if}
									</div>
								</div>
								{#if hasPhone(contact)}
									<div class="mt-3 flex flex-wrap gap-2">
										{#if contact.phone}
											<PhoneButton number={contact.phone} label="Telepon" />
										{/if}
										{#if contact.whatsapp}
											<WhatsAppButton number={contact.whatsapp} label="WhatsApp" />
										{/if}
									</div>
								{/if}
							</Card>
						{/each}
					</div>
				</div>
			{/if}
		{/each}
	</div>
</div>
