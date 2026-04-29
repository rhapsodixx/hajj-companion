<script lang="ts">
	import Card from '$lib/components/ui/Card.svelte';

	const BUS_OPTIONS = [
		{ value: '18', label: 'Bus 18 — Coklat B' },
		{ value: '17', label: 'Bus 17 — Coklat A' },
		{ value: '19', label: 'Bus 19 — Coklat C' }
	];

	let selectedBus = $state('18');
	let darkMode = $state(false);
	let dateOverride = $state('');
	let showDateOverride = $state(false);

	$effect(() => {
		document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
		localStorage.setItem('patuna-dark', darkMode ? '1' : '0');
	});

	$effect(() => {
		if (dateOverride) {
			localStorage.setItem('patuna-date-override', dateOverride);
		} else {
			localStorage.removeItem('patuna-date-override');
		}
	});

	function initFromStorage() {
		const savedDark = localStorage.getItem('patuna-dark');
		if (savedDark === '1') darkMode = true;
		const savedDate = localStorage.getItem('patuna-date-override');
		if (savedDate) {
			dateOverride = savedDate;
			showDateOverride = true;
		}
	}

	initFromStorage();
</script>

<svelte:head><title>Pengaturan — Patuna Coklat-B</title></svelte:head>

<div class="pt-safe mx-auto max-w-120 px-4 pb-6">
	<!-- Header -->
	<div class="pt-4 pb-3">
		<a href="/more" class="inline-flex items-center gap-1 text-sm text-muted">
			<svg
				width="16"
				height="16"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2.5"
				stroke-linecap="round"
				stroke-linejoin="round"
				aria-hidden="true"><polyline points="15 18 9 12 15 6" /></svg
			>
			Lainnya
		</a>
		<h1 class="mt-2 text-xl font-semibold">Pengaturan</h1>
	</div>

	<div class="space-y-4">
		<!-- Bus selector -->
		<Card>
			<p class="mb-3 text-xs font-semibold tracking-wide text-muted uppercase">Bus / Kelompok</p>
			<div class="space-y-2">
				{#each BUS_OPTIONS as option}
					<label class="flex cursor-pointer items-center gap-3">
						<input
							type="radio"
							name="bus"
							value={option.value}
							bind:group={selectedBus}
							class="h-4 w-4 accent-(--color-brand)"
						/>
						<span class="text-sm text-foreground">{option.label}</span>
					</label>
				{/each}
			</div>
			<p class="mt-2 text-xs text-muted">Jadwal akan berubah otomatis sesuai bus yang dipilih.</p>
		</Card>

		<!-- About -->
		<Card>
			<p class="mb-2 text-xs font-semibold tracking-wide text-muted uppercase">Tentang Aplikasi</p>
			<p class="text-sm text-foreground">Patuna Coklat-B Hajj Companion</p>
			<p class="mt-1 text-xs text-muted">v1.0.0 · Bisa dibuka offline</p>
			<p class="mt-2 text-xs leading-relaxed text-muted">
				Dibuat khusus untuk jamaah haji Patuna kelompok Coklat B, Bus 18. Semua data tersimpan di HP
				Anda dan bisa dibuka walau tanpa internet.
			</p>
		</Card>

		<!-- Credits -->
		<Card>
			<p class="mb-2 text-xs font-semibold tracking-wide text-muted uppercase">Informasi</p>
			<div class="space-y-1.5 text-sm text-foreground">
				<p>Kloter: Coklat B · Bus 18</p>
				<p>Travel: Patuna Tour & Travel</p>
				<p>Muthawwif/PIC: Denny Eko Sulistio</p>
				<p>Pembimbing: Ust. Saiful Akib, Lc, MA</p>
			</div>
		</Card>

		<!-- Appearance -->
		<Card>
			<p class="mb-3 text-xs font-semibold tracking-wide text-muted uppercase">Tampilan</p>
			<label class="flex cursor-pointer items-center justify-between">
				<span class="text-sm text-foreground">Mode gelap (malam)</span>
				<button
					role="switch"
					aria-checked={darkMode}
					aria-label="Mode gelap"
					onclick={() => (darkMode = !darkMode)}
					class="relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors duration-200 {darkMode
						? 'bg-(--color-brand)'
						: 'bg-border'}"
				>
					<span
						class="inline-block h-4 w-4 rounded-full bg-white shadow-sm transition-transform duration-200 {darkMode
							? 'translate-x-6'
							: 'translate-x-1'}"
					></span>
				</button>
			</label>
		</Card>

		<!-- Date override (dev/demo) -->
		<Card>
			<div class="flex items-center justify-between">
				<p class="text-xs font-semibold tracking-wide text-muted uppercase">Coba Tanggal Lain</p>
				<button
					onclick={() => (showDateOverride = !showDateOverride)}
					class="text-xs text-(--color-brand)"
				>
					{showDateOverride ? 'Tutup' : 'Atur'}
				</button>
			</div>
			<p class="mt-1 text-xs text-muted">
				Hanya untuk simulasi — mengubah tanggal yang muncul di beranda.
			</p>
			{#if showDateOverride}
				<div class="mt-3">
					<input
						type="date"
						bind:value={dateOverride}
						class="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-foreground"
					/>
					{#if dateOverride}
						<button onclick={() => (dateOverride = '')} class="mt-2 text-xs text-muted underline">
							Gunakan tanggal asli (hari ini)
						</button>
					{/if}
				</div>
			{/if}
		</Card>
	</div>
</div>
