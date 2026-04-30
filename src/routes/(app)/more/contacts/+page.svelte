<script lang="ts">
	import { contacts } from '$lib/data/contacts';
	import Card from '$lib/components/ui/Card.svelte';
	import PhoneButton from '$lib/components/ui/PhoneButton.svelte';
	import WhatsAppButton from '$lib/components/ui/WhatsAppButton.svelte';

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
</script>

<svelte:head><title>Kontak Penting — Patuna Coklat-B</title></svelte:head>

<div class="page-enter pt-safe mx-auto max-w-120 px-4 pb-6">
	<!-- Header -->
	<div class="pt-4 pb-3">
		<a href="/more" class="inline-flex items-center gap-1 text-sm text-muted">
			<svg
				width="16"
				height="16"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="1.5"
				stroke-linecap="round"
				stroke-linejoin="round"
				aria-hidden="true"><polyline points="15 18 9 12 15 6" /></svg
			>
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
					<p class="mb-2 text-[10px] font-bold tracking-widest text-muted uppercase">
						{section.label}
					</p>
					<div class="space-y-2">
						{#each items as contact}
							<Card>
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
