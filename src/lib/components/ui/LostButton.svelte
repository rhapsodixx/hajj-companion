<script lang="ts">
	import { MapPin } from 'phosphor-svelte';
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
		class="tap-target flex w-full items-center justify-center gap-2 rounded-pill border border-border bg-surface px-5 py-3.5 text-sm font-semibold text-foreground shadow-level-3 transition-transform duration-100 ease-out active:scale-[0.98]"
		aria-label="Tunjukkan alamat hotel dalam bahasa Arab"
	>
		<MapPin size={18} weight="regular" />
		Bingung jalan? — Lihat alamat hotel
	</button>
</div>
