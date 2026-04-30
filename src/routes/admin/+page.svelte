<script lang="ts">
	import { PUBLIC_ADMIN_PASSWORD } from '$env/static/public';
	import { supabase } from '$lib/data/supabase';
	import type { DailyOverride } from '$lib/types/override';
	import { fetchOverrides } from '$lib/state/overrides.svelte';

	const ADMIN_PASSWORD = PUBLIC_ADMIN_PASSWORD ?? '';
	const ADMIN_CONFIGURED = ADMIN_PASSWORD.length > 0;
	const BUS_OPTIONS: Array<{ value: DailyOverride['bus']; label: string }> = [
		{ value: 'all', label: 'Semua Bus' },
		{ value: 'B-18', label: 'Bus 18' },
		{ value: 'B-19', label: 'Bus 19' },
		{ value: 'B-20', label: 'Bus 20' },
		{ value: 'B-21', label: 'Bus 21' }
	];
	const FIELD_OPTIONS: Array<{ value: DailyOverride['field']; label: string }> = [
		{ value: 'departureTime', label: 'Waktu Keberangkatan' },
		{ value: 'note', label: 'Catatan' }
	];

	let authenticated = $state(false);
	let passwordInput = $state('');
	let authError = $state('');

	let dayNumber = $state(1);
	let bus = $state<DailyOverride['bus']>('all');
	let field = $state<DailyOverride['field']>('departureTime');
	let value = $state('');
	let publishedBy = $state('');
	let submitting = $state(false);
	let message = $state<{ type: 'ok' | 'err'; text: string } | null>(null);

	let existingOverrides = $state<DailyOverride[]>([]);
	let loadingExisting = $state(false);

	function checkAuth() {
		if (passwordInput === ADMIN_PASSWORD) {
			authenticated = true;
			authError = '';
			loadExisting();
		} else {
			authError = 'Password salah';
		}
	}

	async function loadExisting() {
		if (!supabase) return;
		loadingExisting = true;
		const { data } = await supabase
			.from('daily_overrides')
			.select('*')
			.order('day_number', { ascending: true });
		if (data) existingOverrides = data as DailyOverride[];
		loadingExisting = false;
	}

	async function submitOverride() {
		if (!supabase || !value || !publishedBy) return;
		submitting = true;
		message = null;

		const { error } = await supabase.from('daily_overrides').insert({
			day_number: dayNumber,
			bus,
			field,
			value,
			published_by: publishedBy
		});

		submitting = false;

		if (error) {
			message = { type: 'err', text: `Gagal: ${error.message}` };
		} else {
			message = { type: 'ok', text: 'Override berhasil disimpan!' };
			value = '';
			loadExisting();
			fetchOverrides();
		}
	}

	async function deleteOverride(id: string) {
		if (!supabase) return;
		await supabase.from('daily_overrides').delete().eq('id', id);
		loadExisting();
		fetchOverrides();
	}

	function formatDate(iso: string): string {
		return new Date(iso).toLocaleString('id-ID', {
			day: 'numeric',
			month: 'short',
			hour: '2-digit',
			minute: '2-digit'
		});
	}
</script>

<svelte:head>
	<title>Admin Override — Patuna Coklat-B</title>
</svelte:head>

<div class="mx-auto max-w-120 px-4 pb-8">
	<div class="pt-4 pb-3">
		<h1 class="text-xl font-semibold text-(--color-brand)">Admin Override</h1>
		<p class="mt-1 text-xs text-muted">Kelola perubahan jadwal harian untuk jamaah.</p>
	</div>

	{#if !ADMIN_CONFIGURED}
		<div class="mt-4 rounded-xl border border-red-200 bg-red-50 p-4">
			<p class="text-sm font-medium text-red-700">Admin tidak dikonfigurasi</p>
			<p class="mt-1 text-xs text-red-600">
				Setel PUBLIC_ADMIN_PASSWORD di file .env dan restart server.
			</p>
		</div>
	{:else if !authenticated}
		<!-- Password gate -->
		<div class="mt-4 rounded-xl border border-border bg-surface p-4">
			<p class="mb-3 text-sm font-medium text-foreground">Masukkan password admin</p>
			<div class="flex gap-2">
				<input
					type="password"
					bind:value={passwordInput}
					onkeydown={(e) => e.key === 'Enter' && checkAuth()}
					placeholder="Password"
					class="flex-1 rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground"
				/>
				<button
					onclick={checkAuth}
					class="rounded-lg bg-(--color-brand) px-4 py-2 text-sm font-semibold text-white"
				>
					Masuk
				</button>
			</div>
			{#if authError}
				<p class="mt-2 text-xs text-red-600">{authError}</p>
			{/if}
		</div>
	{:else}
		<!-- Add override form -->
		<div class="mt-4 rounded-xl border border-border bg-surface p-4">
			<p class="mb-3 text-sm font-semibold text-foreground">Tambah Override</p>

			<div class="space-y-3">
				<div>
					<span class="mb-1 block text-xs font-medium text-muted">Hari ke-</span>
					<input
						type="number"
						bind:value={dayNumber}
						min="1"
						max="26"
						class="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground"
					/>
				</div>

				<div>
					<span class="mb-1 block text-xs font-medium text-muted">Bus</span>
					<select
						bind:value={bus}
						class="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground"
					>
						{#each BUS_OPTIONS as opt}
							<option value={opt.value}>{opt.label}</option>
						{/each}
					</select>
				</div>

				<div>
					<span class="mb-1 block text-xs font-medium text-muted">Jenis</span>
					<select
						bind:value={field}
						class="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground"
					>
						{#each FIELD_OPTIONS as opt}
							<option value={opt.value}>{opt.label}</option>
						{/each}
					</select>
				</div>

				<div>
					<span class="mb-1 block text-xs font-medium text-muted">Nilai</span>
					<input
						type="text"
						bind:value={value}
						placeholder={field === 'departureTime' ? 'contoh: 16:30' : 'contoh: Jamarat langsung, tidak mabit'}
						class="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground"
					/>
				</div>

				<div>
					<span class="mb-1 block text-xs font-medium text-muted">Nama Anda</span>
					<input
						type="text"
						bind:value={publishedBy}
						placeholder="Muthawwif / PIC"
						class="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground"
					/>
				</div>

				<button
					onclick={submitOverride}
					disabled={submitting || !value || !publishedBy}
					class="w-full rounded-lg bg-(--color-brand) px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-50"
				>
					{submitting ? 'Menyimpan...' : 'Simpan Override'}
				</button>

				{#if message}
					<p class="text-xs {message.type === 'ok' ? 'text-green-700' : 'text-red-600'}">
						{message.text}
					</p>
				{/if}
			</div>
		</div>

		<!-- Existing overrides -->
		<div class="mt-4 rounded-xl border border-border bg-surface p-4">
			<div class="mb-3 flex items-center justify-between">
				<p class="text-sm font-semibold text-foreground">Override Aktif</p>
				<button onclick={loadExisting} class="text-xs text-(--color-brand)">Refresh</button>
			</div>

			{#if loadingExisting}
				<p class="text-xs text-muted">Memuat...</p>
			{:else if existingOverrides.length === 0}
				<p class="text-xs text-muted">Belum ada override.</p>
			{:else}
				<div class="space-y-2">
					{#each existingOverrides as o}
						<div
							class="flex items-start justify-between gap-2 rounded-lg border border-border bg-background p-3"
						>
							<div>
								<p class="text-xs font-medium text-foreground">
									Hari {o.dayNumber} · {o.bus} · {o.field}
								</p>
								<p class="mt-0.5 text-sm text-foreground">{o.value}</p>
								<p class="mt-1 text-xs text-muted">
									{o.publishedBy} · {formatDate(o.publishedAt)}
								</p>
							</div>
							<button
								onclick={() => deleteOverride(o.id)}
								class="shrink-0 text-xs text-red-500"
								aria-label="Hapus override"
							>
								Hapus
							</button>
						</div>
					{/each}
				</div>
			{/if}
		</div>

		<div class="mt-4">
			<a href="/" class="text-xs text-(--color-brand)">← Kembali ke beranda</a>
		</div>
	{/if}
</div>
