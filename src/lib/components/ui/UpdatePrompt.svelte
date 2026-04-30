<script lang="ts">
	import { useRegisterSW } from 'virtual:pwa-register/svelte';

	const { needRefresh, updateServiceWorker } = useRegisterSW({
		onRegistered(r: ServiceWorkerRegistration | undefined) {
			// Check for updates every 60 minutes when online
			if (r) setInterval(() => r.update(), 60 * 60 * 1000);
		}
	});

	function update() {
		updateServiceWorker(true);
	}
</script>

{#if $needRefresh}
	<div
		class="border-gold fixed top-0 right-0 left-0 z-50 border-b bg-(--color-brand) px-4 py-3"
		style="padding-top: calc(0.75rem + env(safe-area-inset-top, 0px))"
	>
		<div class="mx-auto flex max-w-120 items-center gap-3">
			<p class="min-w-0 flex-1 text-sm text-white">
				Ada informasi jadwal terbaru. Silakan muat ulang.
			</p>
			<button
				onclick={update}
				class="tap-target shrink-0 rounded-lg bg-white px-4 text-sm font-semibold text-(--color-brand)"
			>
				Update
			</button>
		</div>
	</div>
{/if}
