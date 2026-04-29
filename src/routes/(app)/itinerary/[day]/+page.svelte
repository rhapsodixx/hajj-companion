<script lang="ts">
	import { page } from '$app/stores';
	const day = $derived($page.params.day);
</script>

<svelte:head><title>Hari {day} — Patuna Coklat-B</title></svelte:head>

<div class="mx-auto max-w-[480px] px-4 py-6">
	<a href="/itinerary" class="text-sm text-[var(--color-muted)]">← Kembali</a>
	<h1 class="mt-3 text-2xl font-semibold">Hari {day}</h1>
	<p class="mt-2 text-sm text-[var(--color-muted)]">Detail hari — Task 14</p>
</div>
