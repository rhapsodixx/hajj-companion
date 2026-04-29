<script lang="ts">
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
	class="fixed inset-0 z-50 flex flex-col bg-white"
	role="dialog"
	aria-label="Alamat hotel dalam bahasa Arab"
>
	<!-- Close button -->
	<div class="pt-safe flex items-center justify-between px-4 pb-2">
		<p class="text-xs font-semibold tracking-wide text-gray-400 uppercase">
			Tunjukkan ke pengemudi
		</p>
		<button
			onclick={onClose}
			class="tap-target flex h-10 w-10 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-gray-100"
			aria-label="Tutup"
		>
			<svg
				width="20"
				height="20"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2.5"
				stroke-linecap="round"
				stroke-linejoin="round"
				aria-hidden="true"
			>
				<line x1="18" y1="6" x2="6" y2="18" />
				<line x1="6" y1="6" x2="18" y2="18" />
			</svg>
		</button>
	</div>

	<!-- Arabic address — the main content -->
	<div class="flex flex-1 flex-col items-center justify-center px-8">
		<div dir="rtl" class="w-full text-center">
			{#if hotel.addressArabic}
				<p class="text-3xl leading-loose font-semibold text-gray-900" lang="ar">
					{hotel.addressArabic}
				</p>
			{/if}
		</div>

		<!-- Hotel name in Latin for reference -->
		<div class="mt-8 text-center">
			<p class="text-sm font-semibold text-gray-900">{hotel.name}</p>
			{#if hotel.address}
				<p class="mt-1 text-sm text-gray-500">{hotel.address}</p>
			{/if}
		</div>
	</div>

	<!-- Call hotel button -->
	<div class="pb-safe px-6 pt-4">
		{#if phoneHref}
			<a
				href={phoneHref}
				class="tap-target flex w-full items-center justify-center gap-2 rounded-xl bg-gray-900 px-6 py-4 text-base font-semibold text-white transition-transform duration-100 ease-out active:scale-[0.98]"
				aria-label="Telepon {hotel.name}"
			>
				<svg
					width="20"
					height="20"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					aria-hidden="true"
				>
					<path
						d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.41 2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 5.5 5.5l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"
					/>
				</svg>
				Telepon Hotel
			</a>
		{/if}
	</div>
</div>
