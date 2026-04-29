<script lang="ts">
	import Card from '$lib/components/ui/Card.svelte';

	interface Guide {
		title: string;
		description: string;
		url: string;
		size: string;
		icon: 'pdf' | 'link';
	}

	const guides: Guide[] = [
		{
			title: 'Panduan Manasik Patuna',
			description: 'Panduan lengkap manasik haji dari Patuna Travel',
			url: '#',
			size: '—',
			icon: 'pdf'
		},
		{
			title: 'Buku Saku Haji Kemenag',
			description: 'Panduan resmi ibadah haji dari Kementerian Agama RI',
			url: '#',
			size: '—',
			icon: 'pdf'
		},
		{
			title: 'Peta Makkah & Madinah',
			description: 'Peta area sekitar Masjidil Haram dan Masjid Nabawi',
			url: '#',
			size: '—',
			icon: 'pdf'
		},
		{
			title: 'Daftar Koper Patuna',
			description: 'Checklist resmi barang yang harus dibawa',
			url: '#',
			size: '—',
			icon: 'pdf'
		},
		{
			title: 'Jadwal Penerbangan',
			description: 'Detail jadwal keberangkatan dan kepulangan',
			url: '#',
			size: '—',
			icon: 'pdf'
		}
	];
</script>

<svelte:head><title>Panduan PDF — Patuna Coklat-B</title></svelte:head>

<div class="mx-auto max-w-120 px-4 pt-safe pb-6">
	<!-- Header -->
	<div class="pt-4 pb-3">
		<a href="/more" class="inline-flex items-center gap-1 text-sm text-muted">
			<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="15 18 9 12 15 6"/></svg>
			Lainnya
		</a>
		<h1 class="mt-2 text-xl font-semibold">Panduan PDF</h1>
		<p class="text-xs text-muted mt-0.5">Unduh panduan untuk akses offline</p>
	</div>

	<div class="space-y-2">
		{#each guides as guide}
			<Card pressable href={guide.url}>
				<div class="flex items-start gap-3">
					<!-- PDF icon -->
					<div class="shrink-0 w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center">
						{#if guide.icon === 'pdf'}
							<svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
								<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
								<polyline points="14 2 14 8 20 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
								<text x="12" y="18" text-anchor="middle" fill="#ef4444" font-size="6" font-weight="bold" font-family="sans-serif">PDF</text>
							</svg>
						{:else}
							<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
								<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
								<path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
							</svg>
						{/if}
					</div>
					<div class="min-w-0 flex-1">
						<p class="text-sm font-medium text-foreground">{guide.title}</p>
						<p class="mt-0.5 text-xs text-muted">{guide.description}</p>
						{#if guide.size !== '—'}
							<p class="mt-1 text-xs text-muted">{guide.size}</p>
						{/if}
					</div>
					<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="shrink-0 text-muted mt-1" aria-hidden="true">
						<polyline points="9 18 15 12 9 6"/>
					</svg>
				</div>
			</Card>
		{/each}
	</div>

	<p class="mt-6 text-center text-xs text-muted">
		Link akan aktif setelah Patuna membagikan file PDF.<br>
		Unduh saat ada koneksi internet untuk akses offline.
	</p>
</div>
