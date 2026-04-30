<script lang="ts">
	import { browser } from '$app/environment';
	import Card from '$lib/components/ui/Card.svelte';

	type ThemePref = 'auto' | 'dark' | 'light';

	const BUS_OPTIONS = [
		{ value: '18', label: 'Bus 18' },
		{ value: '19', label: 'Bus 19' },
		{ value: '20', label: 'Bus 20' },
		{ value: '21', label: 'Bus 21' }
	];

	let selectedBus = $state('18');
	let themePref = $state<ThemePref>('auto');
	let dateOverride = $state('');
	let showDateOverride = $state(false);

	function isAfterMaghrib(): boolean {
		const h = new Date().getHours();
		return h >= 18 || h < 4;
	}

	function applyTheme(pref: ThemePref) {
		const dark = pref === 'dark' || (pref === 'auto' && isAfterMaghrib());
		document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
	}

	$effect(() => {
		if (!browser) return;
		applyTheme(themePref);
		localStorage.setItem('patuna-theme', themePref);
	});

	$effect(() => {
		if (!browser) return;
		if (dateOverride) {
			localStorage.setItem('patuna-date-override', dateOverride);
		} else {
			localStorage.removeItem('patuna-date-override');
		}
	});

	$effect(() => {
		if (!browser) return;
		localStorage.setItem('patuna-bus', selectedBus);
	});

	function initFromStorage() {
		const savedBus = localStorage.getItem('patuna-bus');
		if (savedBus && BUS_OPTIONS.some((o) => o.value === savedBus)) {
			selectedBus = savedBus;
		}
		const saved = localStorage.getItem('patuna-theme');
		if (saved === 'dark' || saved === 'light' || saved === 'auto') {
			themePref = saved;
		} else {
			const legacy = localStorage.getItem('patuna-dark');
			if (legacy === '1') themePref = 'dark';
			else if (legacy === '0') themePref = 'light';
			localStorage.removeItem('patuna-dark');
		}
		const savedDate = localStorage.getItem('patuna-date-override');
		if (savedDate) {
			dateOverride = savedDate;
			showDateOverride = true;
		}
	}

	if (browser) initFromStorage();

	$effect(() => {
		if (!browser || themePref !== 'auto') return;
		const id = setInterval(() => applyTheme('auto'), 60_000);
		return () => clearInterval(id);
	});
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
			<p class="mt-2 text-xs text-muted">Pilih bus Anda untuk informasi yang akurat.</p>
		</Card>

		<!-- About -->
		<Card>
			<p class="mb-2 text-xs font-semibold tracking-wide text-muted uppercase">Tentang Aplikasi</p>
			<p class="text-sm text-foreground">Patuna Coklat-B Hajj Companion</p>
			<p class="mt-1 text-xs text-muted">v1.0.0 · Bisa dibuka offline</p>
			<p class="mt-2 text-xs leading-relaxed text-muted">
				Dibuat khusus untuk jamaah haji Patuna kelompok Coklat B, Bus {selectedBus}. Semua data
				tersimpan di HP Anda dan bisa dibuka walau tanpa internet.
			</p>
		</Card>

		<!-- Credits -->
		<Card>
			<p class="mb-2 text-xs font-semibold tracking-wide text-muted uppercase">Informasi</p>
			<div class="space-y-1.5 text-sm text-foreground">
				<p>Kloter: Coklat B · Bus {selectedBus}</p>
				<p>Travel: Patuna Tour & Travel</p>
				<p>Muthawwif/PIC: Denny Eko Sulistio</p>
				<p>Pembimbing: Ust. Saiful Akib, Lc, MA</p>
			</div>
		</Card>

		<!-- Appearance -->
		<Card>
			<p class="mb-3 text-xs font-semibold tracking-wide text-muted uppercase">Tampilan</p>
			<div class="flex rounded-xl border border-border bg-background p-1">
				{#each [{ value: 'auto' as ThemePref, label: 'Otomatis' }, { value: 'light' as ThemePref, label: 'Terang' }, { value: 'dark' as ThemePref, label: 'Gelap' }] as opt}
					<button
						onclick={() => (themePref = opt.value)}
						class="tap-target flex-1 rounded-lg px-3 py-2 text-center text-xs font-semibold transition-colors duration-150 {themePref ===
						opt.value
							? 'bg-(--color-brand) text-white'
							: 'text-muted'}"
					>
						{opt.label}
					</button>
				{/each}
			</div>
			<p class="mt-2 text-xs text-muted">
				{#if themePref === 'auto'}
					Otomatis gelap setelah Maghrib (18:00–04:00)
				{:else if themePref === 'dark'}
					Selalu tampil gelap
				{:else}
					Selalu tampil terang
				{/if}
			</p>
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
