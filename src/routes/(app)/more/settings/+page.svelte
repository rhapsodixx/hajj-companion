<script lang="ts">
	import Card from '$lib/components/ui/Card.svelte';

	const BUS_OPTIONS = [
		{ value: '18', label: 'Bus 18 — Coklat B' },
		{ value: '17', label: 'Bus 17 — Coklat A' },
		{ value: '19', label: 'Bus 19 — Coklat C' }
	];

	let selectedBus = $state('18');
</script>

<svelte:head><title>Pengaturan — Patuna Coklat-B</title></svelte:head>

<div class="mx-auto max-w-120 px-4 pt-safe pb-6">
	<!-- Header -->
	<div class="pt-4 pb-3">
		<a href="/more" class="inline-flex items-center gap-1 text-sm text-muted">
			<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="15 18 9 12 15 6"/></svg>
			Lainnya
		</a>
		<h1 class="mt-2 text-xl font-semibold">Pengaturan</h1>
	</div>

	<div class="space-y-4">
		<!-- Bus selector -->
		<Card>
			<p class="text-xs font-semibold text-muted uppercase tracking-wide mb-3">Bus / Kelompok</p>
			<div class="space-y-2">
				{#each BUS_OPTIONS as option}
					<label class="flex items-center gap-3 cursor-pointer">
						<input
							type="radio"
							name="bus"
							value={option.value}
							bind:group={selectedBus}
							class="w-4 h-4 accent-(--color-brand)"
						/>
						<span class="text-sm text-foreground">{option.label}</span>
					</label>
				{/each}
			</div>
			<p class="mt-2 text-xs text-muted">Jadwal otomatis menyesuaikan kelompok bus Anda.</p>
		</Card>

		<!-- About -->
		<Card>
			<p class="text-xs font-semibold text-muted uppercase tracking-wide mb-2">Tentang</p>
			<p class="text-sm text-foreground">Patuna Coklat-B Hajj Companion</p>
			<p class="mt-1 text-xs text-muted">v1.0.0 · Offline PWA</p>
			<p class="mt-2 text-xs text-muted leading-relaxed">
				Dibuat untuk jamaah haji Patuna Travel kelompok Coklat B, Bus 18.
				Semua data tersimpan di perangkat dan dapat diakses tanpa koneksi internet.
			</p>
		</Card>

		<!-- Credits -->
		<Card>
			<p class="text-xs font-semibold text-muted uppercase tracking-wide mb-2">Informasi</p>
			<div class="space-y-1.5 text-sm text-foreground">
				<p>Kloter: Coklat B · Bus 18</p>
				<p>Travel: Patuna Tour & Travel</p>
				<p>Muthawwif/PIC: Denny Eko Sulistio</p>
				<p>Pembimbing: Ust. Saiful Akib, Lc, MA</p>
			</div>
		</Card>
	</div>
</div>
