<script lang="ts">
	import ArabicText from '$lib/components/ui/ArabicText.svelte';
	import Card from '$lib/components/ui/Card.svelte';
	import HeroCard from '$lib/components/ui/HeroCard.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import PhoneButton from '$lib/components/ui/PhoneButton.svelte';
	import WhatsAppButton from '$lib/components/ui/WhatsAppButton.svelte';
	import PhaseRibbon from '$lib/components/ui/PhaseRibbon.svelte';

	const phases = [
		{ key: 'arrival', label: 'Kedatangan' },
		{ key: 'madinah', label: 'Madinah' },
		{ key: 'makkah', label: 'Makkah' },
		{ key: 'ash-shishah', label: 'Ash-Shishah' },
		{ key: 'rukun', label: 'Rukun Haji' },
		{ key: 'post-hajj', label: 'Pasca Haji' },
		{ key: 'departure', label: 'Kepulangan' }
	];

	const talbiyah =
		'لَبَّيْكَ اللَّهُمَّ لَبَّيْكَ، لَبَّيْكَ لَا شَرِيكَ لَكَ لَبَّيْكَ، إِنَّ الْحَمْدَ وَالنِّعْمَةَ لَكَ وَالْمُلْكَ، لَا شَرِيكَ لَكَ';
	const niatUmrah = 'لَبَّيْكَ اللَّهُمَّ عُمْرَةً';
	const niatHaji = 'لَبَّيْكَ اللَّهُمَّ حَجًّا';
</script>

<svelte:head><title>Design Gallery — Dev Only</title></svelte:head>

<div class="mx-auto max-w-120 space-y-12 px-4 py-10">
	<header>
		<p class="text-xs font-semibold tracking-widest text-muted uppercase">
			Dev Route
		</p>
		<h1 class="mt-1 text-2xl font-semibold">Design Gallery</h1>
		<p class="mt-1 text-sm text-muted">Patuna Coklat-B Hajj Companion — Task 10</p>
	</header>

	<!-- ── Phase Ribbons ── -->
	<section class="space-y-3">
		<h2 class="text-lg font-semibold">PhaseRibbon</h2>
		<div class="flex flex-wrap gap-2">
			{#each phases as p}
				<PhaseRibbon phase={p.key} label={p.label} />
			{/each}
		</div>
	</section>

	<!-- ── Buttons ── -->
	<section class="space-y-3">
		<h2 class="text-lg font-semibold">Button</h2>
		<div class="flex flex-wrap gap-3">
			<Button>Lihat Detail</Button>
			<Button variant="secondary">Simpan</Button>
			<Button variant="ghost">Batal</Button>
		</div>
		<div class="flex flex-wrap gap-3">
			<Button size="sm">Kecil</Button>
			<Button size="md">Sedang</Button>
			<Button size="lg">Besar</Button>
		</div>
		<div class="flex flex-wrap gap-3">
			<Button disabled>Disabled</Button>
			<Button href="/itinerary">Link Button →</Button>
		</div>
	</section>

	<!-- ── Phone + WhatsApp ── -->
	<section class="space-y-3">
		<h2 class="text-lg font-semibold">PhoneButton + WhatsAppButton</h2>
		<div class="flex flex-wrap gap-3">
			<PhoneButton number="+62 812 3456 7890" label="Pak Ahmad (Muthawwif)" />
			<WhatsAppButton number="+62 812 3456 7890" label="WhatsApp Ketua" message="Assalamu'alaikum Pak, saya jamaah Coklat B..." />
		</div>
	</section>

	<!-- ── Cards ── -->
	<section class="space-y-3">
		<h2 class="text-lg font-semibold">Card</h2>
		<Card>
			<p class="font-medium">Kartu biasa</p>
			<p class="mt-1 text-sm text-muted">Tanpa efek tekan</p>
		</Card>
		<Card pressable>
			<p class="font-medium">Kartu bisa ditekan</p>
			<p class="mt-1 text-sm text-muted">Scale 0.98 saat active — 100ms ease-out</p>
		</Card>
		<Card pressable href="/itinerary">
			<p class="font-medium">Kartu sebagai link →</p>
			<p class="mt-1 text-sm text-muted">Navigasi ke /itinerary</p>
		</Card>
	</section>

	<!-- ── HeroCard ── -->
	<section class="space-y-3">
		<h2 class="text-lg font-semibold">HeroCard</h2>
		{#each phases as p}
			<HeroCard phase={p.key}>
				{#snippet label()}
					<p class="text-xs font-semibold tracking-widest text-white/70 uppercase">{p.label}</p>
				{/snippet}
				<p class="text-xl font-semibold text-white">Hari 16 — Wukuf di Arafah</p>
				<p class="mt-1 text-sm text-white/80">9 Zulhijjah · 26 Mei 2026</p>
			</HeroCard>
		{/each}
	</section>

	<!-- ── Arabic Rendering ── -->
	<section class="space-y-4">
		<h2 class="text-lg font-semibold">Arabic Rendering (Amiri)</h2>
		<Card>
			<p class="mb-1 text-xs font-medium text-muted uppercase">xl — Niat Haji</p>
			<ArabicText text={niatHaji} size="xl" />
			<p class="mt-1 text-sm italic text-muted">Labbaik Allahumma Hajjan</p>
		</Card>
		<Card>
			<p class="mb-1 text-xs font-medium text-muted uppercase">lg — Niat Umrah</p>
			<ArabicText text={niatUmrah} size="lg" />
			<p class="mt-1 text-sm italic text-muted">Labbaik Allahumma 'Umratan</p>
		</Card>
		<Card>
			<p class="mb-1 text-xs font-medium text-muted uppercase">base — Talbiyah</p>
			<ArabicText text={talbiyah} size="base" />
			<p class="mt-1 text-sm text-muted">Labbaik Allahumma Labbaik...</p>
		</Card>
	</section>

	<!-- ── HeroCard with Arabic ── -->
	<section class="space-y-3">
		<h2 class="text-lg font-semibold">HeroCard + Arabic (Niat Card)</h2>
		<HeroCard phase="rukun">
			{#snippet label()}
				<p class="text-xs font-semibold tracking-widest text-white/70 uppercase">Niat Haji</p>
			{/snippet}
			<ArabicText text={niatHaji} size="xl" class="text-white" />
			<p class="mt-2 text-sm text-white/70 italic">Labbaik Allahumma Hajjan</p>
		</HeroCard>
	</section>

	<!-- ── Type Scale ── -->
	<section class="space-y-3">
		<h2 class="text-lg font-semibold">Type Scale</h2>
		<div class="space-y-2">
			<p style="font-size: var(--text-3xl); font-weight: 600; line-height: 1.2">Hari 16 — Wukuf</p>
			<p style="font-size: var(--text-2xl); font-weight: 600">Padang Arafah</p>
			<p style="font-size: var(--text-xl); font-weight: 500">Sholat Zuhur dalam 2 jam</p>
			<p style="font-size: var(--text-lg)">Makan Pagi di Tenda Arafah</p>
			<p style="font-size: var(--text-base)">
				Bersiap untuk wukuf dalam keadaan berwudhu, memperbanyak dzikir sampai waktu adzan.
			</p>
			<p style="font-size: var(--text-sm); color: var(--color-muted)">
				9 Zulhijjah 1447 · Selasa, 26 Mei 2026
			</p>
			<p style="font-size: var(--text-xs); color: var(--color-muted)">KONDISIONAL</p>
		</div>
	</section>

	<!-- ── Dark mode toggle ── -->
	<section class="space-y-3">
		<h2 class="text-lg font-semibold">Dark Mode</h2>
		<Button
			variant="secondary"
			onclick={() => {
				const html = document.documentElement;
				html.dataset.theme = html.dataset.theme === 'dark' ? 'light' : 'dark';
			}}
		>
			Toggle Dark Mode
		</Button>
	</section>
</div>
