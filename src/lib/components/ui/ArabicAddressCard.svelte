<script lang="ts">
	import { X, Phone, MapPin } from 'phosphor-svelte';
	import type { Contact } from '$lib/types/contact';
	import { onMount } from 'svelte';
	import gsap from 'gsap';

	interface Props {
		hotel: Contact;
		onClose: () => void;
	}

	let { hotel, onClose }: Props = $props();

	const phoneHref = $derived(hotel.phone ? `tel:${hotel.phone.replace(/\s/g, '')}` : null);

	let overlay: HTMLElement | undefined = $state();
	let modal: HTMLElement | undefined = $state();

	onMount(() => {
		if (overlay && modal) {
			gsap.fromTo(overlay, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'power2.out' });
			gsap.fromTo(
				modal,
				{ y: 40, opacity: 0, scale: 0.96 },
				{ y: 0, opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.15)', delay: 0.05 }
			);
		}
	});

	function closeCard() {
		if (overlay && modal) {
			gsap.to(modal, { y: 20, opacity: 0, scale: 0.96, duration: 0.2, ease: 'power2.in' });
			gsap.to(overlay, {
				opacity: 0,
				duration: 0.3,
				ease: 'power2.in',
				delay: 0.1,
				onComplete: onClose
			});
		} else {
			onClose();
		}
	}
</script>

<div
	bind:this={overlay}
	class="pb-safe fixed inset-0 z-50 flex flex-col items-center justify-end bg-background/80 p-4 backdrop-blur-md sm:justify-center"
	role="dialog"
	aria-modal="true"
	aria-labelledby="modal-title"
	tabindex="-1"
	onclick={(e) => {
		if (e.target === overlay) closeCard();
	}}
	onkeydown={(e) => {
		if (e.key === 'Escape') closeCard();
	}}
>
	<div
		bind:this={modal}
		class="relative w-full max-w-sm overflow-hidden rounded-3xl border border-border/50 bg-surface shadow-2xl"
	>
		<!-- Top decorative bar -->
		<div class="h-2 w-full bg-(--color-brand)"></div>

		<div class="p-6">
			<!-- Close Button -->
			<button
				onclick={closeCard}
				class="tap-target absolute top-6 right-6 flex h-8 w-8 items-center justify-center rounded-full bg-muted/10 text-muted transition-colors hover:bg-muted/20 hover:text-foreground active:scale-95"
				aria-label="Tutup"
			>
				<X size={16} weight="bold" />
			</button>

			<div class="mb-4 flex items-center justify-center">
				<div
					class="flex h-14 w-14 items-center justify-center rounded-2xl bg-(--color-brand)/10 text-(--color-brand)"
				>
					<MapPin size={28} weight="fill" />
				</div>
			</div>

			<h2
				id="modal-title"
				class="mb-1 text-center text-xs font-bold tracking-widest text-(--color-brand) uppercase"
			>
				Alamat Hotel
			</h2>

			<div class="mt-6 flex flex-col items-center justify-center">
				<div dir="rtl" class="w-full text-center">
					{#if hotel.addressArabic}
						<p class="text-[28px] leading-loose font-bold text-foreground" lang="ar">
							{hotel.addressArabic}
						</p>
					{/if}
				</div>

				<div class="mt-6 w-full rounded-2xl bg-muted/5 p-4 text-center">
					<p class="text-sm font-bold text-foreground">{hotel.name}</p>
					{#if hotel.address}
						<p class="mt-1.5 text-xs leading-relaxed font-medium text-muted">{hotel.address}</p>
					{/if}
				</div>
			</div>

			{#if phoneHref}
				<div class="mt-6 border-t border-border/50 pt-2">
					<a
						href={phoneHref}
						class="tap-target flex w-full items-center justify-center gap-2 rounded-2xl bg-foreground px-5 py-3.5 text-sm font-bold text-background shadow-[0_4px_12px_rgba(0,0,0,0.1)] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-[0_6px_16px_rgba(0,0,0,0.15)] active:scale-[0.98]"
					>
						<Phone size={18} weight="fill" />
						Telepon Hotel
					</a>
				</div>
			{/if}
		</div>
	</div>
</div>
