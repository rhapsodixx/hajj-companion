<script lang="ts">
	import { page } from '$app/stores';
	const guideId = $derived($page.params.guideId);
</script>

<svelte:head><title>Panduan Ritual — Patuna Coklat-B</title></svelte:head>

<!-- Full-screen ritual guide — no bottom nav (no pb-nav padding) -->
<div class="mx-auto max-w-120 px-4 pt-safe py-6">
	<a href="/" class="text-sm text-muted">← Kembali</a>
	<h1 class="mt-3 text-2xl font-semibold">Panduan: {guideId}</h1>
	<p class="mt-2 text-sm text-muted">Panduan ritual langkah demi langkah — Task 19</p>
</div>
