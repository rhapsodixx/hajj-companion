<script lang="ts">
	import Card from '$lib/components/ui/Card.svelte';
</script>

<svelte:head><title>Lainnya — Patuna Coklat-B</title></svelte:head>

<div class="page-enter mx-auto max-w-120 px-4 py-6">
	<h1 class="text-xl font-semibold">Lainnya</h1>

	<div class="mt-6 space-y-2">
		<Card pressable href="/more/contacts">
			<div class="flex items-center justify-between gap-3">
				<div class="flex items-center gap-3">
					<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="shrink-0 text-(--color-brand)" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
					<div>
						<p class="font-medium text-foreground">Kontak Penting</p>
						<p class="mt-0.5 text-xs text-muted">Tim bus, hotel, darurat, konsuler</p>
					</div>
				</div>
				<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="shrink-0 text-muted" aria-hidden="true"><polyline points="9 18 15 12 9 6"/></svg>
			</div>
		</Card>
		<Card pressable href="/more/guides">
			<div class="flex items-center justify-between gap-3">
				<div class="flex items-center gap-3">
					<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="shrink-0 text-(--color-brand)" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
					<div>
						<p class="font-medium text-foreground">Panduan PDF</p>
						<p class="mt-0.5 text-xs text-muted">Buku panduan & materi manasik</p>
					</div>
				</div>
				<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="shrink-0 text-muted" aria-hidden="true"><polyline points="9 18 15 12 9 6"/></svg>
			</div>
		</Card>
		<Card pressable href="/more/settings">
			<div class="flex items-center justify-between gap-3">
				<div class="flex items-center gap-3">
					<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="shrink-0 text-(--color-brand)" aria-hidden="true"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
					<div>
						<p class="font-medium text-foreground">Pengaturan</p>
						<p class="mt-0.5 text-xs text-muted">Tema, nomor bus, preferensi</p>
					</div>
				</div>
				<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="shrink-0 text-muted" aria-hidden="true"><polyline points="9 18 15 12 9 6"/></svg>
			</div>
		</Card>
	</div>
</div>
