<script lang="ts">
	import { X, Phone } from 'phosphor-svelte';
	import type { Contact } from '$lib/types/contact';

	interface Props {
		hotel: Contact;
		onClose: () => void;
	}

	let { hotel, onClose }: Props = $props();

	const phoneHref = $derived(hotel.phone ? `tel:${hotel.phone.replace(/\s/g, '')}` : null);
</script>

<!-- Full-screen overlay for showing to taxi drivers -->
<div
	class="fixed inset-0 z-50 flex flex-col bg-background"
	role="dialog"
	aria-label="Alamat hotel dalam bahasa Arab"
>
	<!-- Close button -->
	<div class="pt-safe flex items-center justify-between px-4 pb-2">
		<p class="text-xs font-semibold tracking-wide text-muted uppercase">Tunjukkan ke pengemudi</p>
		<button
			onclick={onClose}
			class="tap-target flex h-10 w-10 items-center justify-center rounded-full text-muted transition-colors hover:bg-surface"
			aria-label="Tutup"
		>
			<X size={20} weight="regular" />
		</button>
	</div>

	<!-- Arabic address — the main content -->
	<div class="flex flex-1 flex-col items-center justify-center px-8">
		<div dir="rtl" class="w-full text-center">
			{#if hotel.addressArabic}
				<p class="text-3xl leading-loose font-semibold text-foreground" lang="ar">
					{hotel.addressArabic}
				</p>
			{/if}
		</div>

		<!-- Hotel name in Latin for reference -->
		<div class="mt-8 text-center">
			<p class="text-sm font-semibold text-foreground">{hotel.name}</p>
			{#if hotel.address}
				<p class="mt-1 text-sm text-muted">{hotel.address}</p>
			{/if}
		</div>
	</div>

	<!-- Call hotel button -->
	<div class="pb-safe px-6 pt-4">
		{#if phoneHref}
			<a
				href={phoneHref}
				class="tap-target flex w-full items-center justify-center gap-2 rounded-pill bg-foreground px-6 py-4 text-base font-semibold text-surface transition-transform duration-100 ease-out active:scale-[0.98]"
				aria-label="Telepon {hotel.name}"
			>
				<Phone size={20} weight="regular" />
				Telepon Hotel
			</a>
		{/if}
	</div>
</div>
