<script lang="ts">
	import { useRegisterSW } from 'virtual:pwa-register/svelte';
	import gsap from 'gsap';

	const { needRefresh, updateServiceWorker } = useRegisterSW({
		onRegistered(r: ServiceWorkerRegistration | undefined) {
			// Check for updates every 60 minutes when online
			if (r) setInterval(() => r.update(), 60 * 60 * 1000);
		}
	});

	let promptElement: HTMLElement | undefined = $state();

	$effect(() => {
		if ($needRefresh && promptElement) {
			gsap.fromTo(
				promptElement,
				{ yPercent: -100, autoAlpha: 0 },
				{ yPercent: 0, autoAlpha: 1, duration: 0.6, ease: 'elastic.out(1, 0.8)' }
			);
		}
	});

	async function triggerUpdate() {
		$needRefresh = false;
		await updateServiceWorker(true);
		
		// Fallback reload just in case controllerchange doesn't fire from the plugin
		setTimeout(() => {
			window.location.reload();
		}, 1200);
	}

	async function update() {
		if (promptElement) {
			gsap.to(promptElement, {
				yPercent: -100,
				autoAlpha: 0,
				duration: 0.3,
				ease: 'power2.in',
				onComplete: triggerUpdate
			});
		} else {
			triggerUpdate();
		}
	}
</script>

{#if $needRefresh}
	<div
		bind:this={promptElement}
		class="fixed top-0 right-0 left-0 z-50 border-b border-border bg-pastel-green px-4 py-3 shadow-md"
		style="padding-top: calc(0.75rem + env(safe-area-inset-top, 0px)); visibility: hidden;"
	>
		<div class="mx-auto flex max-w-120 items-center gap-4">
			<div
				class="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand/5 text-brand"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="h-6 w-6"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
					/>
				</svg>
			</div>
			<div class="min-w-0 flex-1">
				<p class="text-sm font-bold text-brand">Pembaruan Tersedia</p>
				<p class="truncate text-xs text-muted">Aplikasi versi terbaru siap digunakan.</p>
			</div>
			<button
				onclick={update}
				class="tap-target shrink-0 rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-surface shadow-sm transition-transform active:scale-95"
			>
				Update
			</button>
		</div>
	</div>
{/if}
