<script lang="ts">
	import type { Contact } from '$lib/types/contact';
	import ArabicAddressCard from './ArabicAddressCard.svelte';

	interface Props {
		hotel: Contact;
	}

	let { hotel }: Props = $props();
	let showCard = $state(false);
</script>

{#if showCard}
	<ArabicAddressCard {hotel} onClose={() => (showCard = false)} />
{/if}

<!-- Sticky floating button -->
<div class="sticky bottom-4 z-40 mx-auto mt-4 max-w-120 px-4">
	<button
		onclick={() => (showCard = true)}
		class="tap-target flex w-full items-center justify-center gap-2 rounded-2xl border border-red-400/40 bg-white px-5 py-3.5 text-sm font-semibold text-red-600 shadow-sm transition-transform duration-100 ease-out active:scale-[0.98]"
		aria-label="Tunjukkan alamat hotel dalam bahasa Arab"
	>
		<svg
			width="18"
			height="18"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="1.5"
			stroke-linecap="round"
			stroke-linejoin="round"
			aria-hidden="true"
		>
			<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
			<circle cx="12" cy="10" r="3" />
		</svg>
		Bingung jalan? — Lihat alamat hotel
	</button>
</div>
