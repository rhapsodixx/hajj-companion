<script lang="ts">
	import Card from '$lib/components/ui/Card.svelte';

	interface Guide {
		title: string;
		description: string;
		url: string;
		size: string;
		icon: 'pdf' | 'link';
		offline?: boolean;
	}

	const guides: Guide[] = [
		{
			title: 'Rundown Manasik Coklat B',
			description: 'Jadwal lengkap manasik di ICE BSD, 9–11 Mei 2026',
			url: '/pdfs/rundown-manasik.pdf',
			size: '56 KB',
			icon: 'pdf',
			offline: true
		},
		{
			title: 'Itinerary Haji 2026 — Coklat B',
			description: 'Jadwal 26 hari keberangkatan haji Patuna Coklat B',
			url: '/pdfs/itinerary-coklat-b.pdf',
			size: '106 KB',
			icon: 'pdf',
			offline: true
		},
		{
			title: 'Panduan Persiapan Jamaah Haji',
			description: 'Panduan lengkap persiapan dari Patuna Travel',
			url: '/pdfs/panduan-persiapan.pdf',
			size: '330 KB',
			icon: 'pdf',
			offline: true
		},
		{
			title: 'Dokumen Pendukung Manasik',
			description: 'Dokumen tambahan untuk manasik di Santika ICE BSD',
			url: '/pdfs/dokumen-pendukung-manasik.pdf',
			size: '626 KB',
			icon: 'pdf',
			offline: true
		},
		{
			title: 'Doa Zikir Haji & Umrah',
			description: 'Kumpulan doa dan zikir untuk ibadah haji dan umrah',
			url: 'https://drive.google.com/file/d/1PLrAgbFMv-Fg_O8ufU1VKw_RlLMrNlSB/view',
			size: '44.7 MB',
			icon: 'link'
		}
	];
</script>

<svelte:head><title>Panduan PDF — Patuna Coklat-B</title></svelte:head>

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
		<h1 class="mt-2 text-xl font-semibold">Panduan PDF</h1>
		<p class="mt-0.5 text-xs text-muted">Unduh panduan untuk akses offline</p>
	</div>

	<div class="space-y-2">
		{#each guides as guide}
			<Card pressable href={guide.url}>
				<div class="flex items-start gap-3">
					<!-- PDF icon -->
					<div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-500/10">
						{#if guide.icon === 'pdf'}
							<svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
								<path
									d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
									stroke="currentColor"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
								/>
								<polyline
									points="14 2 14 8 20 8"
									stroke="currentColor"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
								/>
								<text
									x="12"
									y="18"
									text-anchor="middle"
									fill="#ef4444"
									font-size="6"
									font-weight="bold"
									font-family="sans-serif">PDF</text
								>
							</svg>
						{:else}
							<svg
								width="20"
								height="20"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
								aria-hidden="true"
							>
								<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
								<path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
							</svg>
						{/if}
					</div>
					<div class="min-w-0 flex-1">
						<p class="text-sm font-medium text-foreground">{guide.title}</p>
						<p class="mt-0.5 text-xs text-muted">{guide.description}</p>
						<div class="mt-1 flex items-center gap-2">
							<p class="text-xs text-muted">{guide.size}</p>
							{#if guide.offline}
								<span
									class="rounded-full bg-(--color-phase-madinah)/10 px-1.5 py-0.5 text-[10px] text-(--color-phase-madinah)"
									>Tersedia offline</span
								>
							{/if}
						</div>
					</div>
					<svg
						width="16"
						height="16"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2.5"
						stroke-linecap="round"
						stroke-linejoin="round"
						class="mt-1 shrink-0 text-muted"
						aria-hidden="true"
					>
						<polyline points="9 18 15 12 9 6" />
					</svg>
				</div>
			</Card>
		{/each}
	</div>

	<p class="mt-6 text-center text-xs text-muted">
		Panduan bertanda "Tersedia offline" bisa dibuka tanpa internet setelah pertama kali dibuka.
	</p>
</div>
