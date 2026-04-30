<script lang="ts">
	import { onMount } from 'svelte';

	let showBanner = $state(false);
	let deferredPrompt = $state<Event | null>(null);
	let isIos = $state(false);

	onMount(() => {
		// Only show if not already installed
		if (window.matchMedia('(display-mode: standalone)').matches) return;
		// @ts-expect-error - iOS specific non-standard property
		if (window.navigator.standalone === true) return;

		// Respect 3-day dismissal cooldown
		const dismissedUntil = localStorage.getItem('patuna.installDismissed');
		if (dismissedUntil && Number(dismissedUntil) > Date.now()) return;

		// Check for iOS
		const ua = window.navigator.userAgent.toLowerCase();
		const isIosDevice = /iphone|ipad|ipod/.test(ua);

		if (isIosDevice) {
			isIos = true;
			// For iOS we just show the banner right away
			showBanner = true;
		}

		window.addEventListener('beforeinstallprompt', (e) => {
			e.preventDefault();
			deferredPrompt = e;
			showBanner = true;
		});
	});

	async function install() {
		if (isIos) return; // iOS has no programmatic install
		if (!deferredPrompt) return;
		// @ts-expect-error — prompt() is on BeforeInstallPromptEvent
		await deferredPrompt.prompt();
		// @ts-expect-error — userChoice is on BeforeInstallPromptEvent
		const { outcome } = await deferredPrompt.userChoice;
		if (outcome === 'accepted') showBanner = false;
		deferredPrompt = null;
	}

	function dismiss() {
		showBanner = false;
		// Don't show again for 3 days
		localStorage.setItem('patuna.installDismissed', String(Date.now() + 3 * 86400000));
	}
</script>

{#if showBanner}
	<div
		class="fixed right-0 bottom-0 left-0 z-50 border-t border-border bg-[var(--color-background)] px-4 py-3 shadow-lg"
		style="padding-bottom: calc(0.75rem + env(safe-area-inset-bottom, 0px))"
	>
		<div class="mx-auto flex max-w-120 items-center gap-3">
			<div class="min-w-0 flex-1">
				<p class="text-sm font-semibold text-foreground">Simpan di layar utama</p>
				{#if isIos}
					<p class="text-xs leading-snug text-muted">
						Ketuk ikon <span class="font-bold">Share</span> di bawah, lalu pilih
						<span class="font-bold">Add to Home Screen</span>
					</p>
				{:else}
					<p class="text-xs text-muted">Bisa dibuka walau tanpa internet</p>
				{/if}
			</div>
			<button onclick={dismiss} class="tap-target shrink-0 text-sm text-muted" aria-label="Tutup">
				Tutup
			</button>
			{#if !isIos}
				<button
					onclick={install}
					class="tap-target shrink-0 rounded-lg bg-(--color-brand) px-4 text-sm font-semibold text-white"
				>
					Simpan
				</button>
			{/if}
		</div>
	</div>
{/if}
