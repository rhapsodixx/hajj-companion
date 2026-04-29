<script lang="ts">
	import ArabicText from '$lib/components/ui/ArabicText.svelte';

	const phases = [
		{ key: 'arrival', label: 'Arrival', color: 'var(--color-phase-arrival)' },
		{ key: 'madinah', label: 'Madinah', color: 'var(--color-phase-madinah)' },
		{ key: 'makkah', label: 'Makkah', color: 'var(--color-phase-makkah)' },
		{ key: 'ash-shishah', label: 'Ash Shishah', color: 'var(--color-phase-ash-shishah)' },
		{ key: 'rukun', label: 'Rukun (Wukuf)', color: 'var(--color-phase-rukun)' },
		{ key: 'post-hajj', label: 'Post-Hajj', color: 'var(--color-phase-post-hajj)' },
		{ key: 'departure', label: 'Departure', color: 'var(--color-phase-departure)' }
	];

	const talbiyah =
		'لَبَّيْكَ اللَّهُمَّ لَبَّيْكَ، لَبَّيْكَ لَا شَرِيكَ لَكَ لَبَّيْكَ، إِنَّ الْحَمْدَ وَالنِّعْمَةَ لَكَ وَالْمُلْكَ، لَا شَرِيكَ لَكَ';
	const niatUmrah = 'لَبَّيْكَ اللَّهُمَّ عُمْرَةً';
	const niatHaji = 'لَبَّيْكَ اللَّهُمَّ حَجًّا';
</script>

<svelte:head><title>Design Tokens — Dev Only</title></svelte:head>

<div class="mx-auto max-w-[480px] space-y-12 px-4 py-10">
	<header>
		<p class="text-xs font-semibold tracking-widest text-[var(--color-muted)] uppercase">
			Dev Route
		</p>
		<h1 class="mt-1 text-2xl font-semibold">Design Tokens</h1>
		<p class="mt-1 text-sm text-[var(--color-muted)]">Patuna Coklat-B Hajj Companion</p>
	</header>

	<!-- Colors -->
	<section class="space-y-3">
		<h2 class="text-lg font-semibold">Brand Colors</h2>
		<div class="flex gap-2">
			<div
				class="h-12 w-12 rounded-lg"
				style="background: var(--color-brand)"
				title="brand #5C3A21"
			></div>
			<div
				class="h-12 w-12 rounded-lg"
				style="background: var(--color-gold)"
				title="gold #C8A971"
			></div>
			<div
				class="h-12 w-12 rounded-lg border border-[var(--color-border)]"
				style="background: var(--color-background)"
				title="background #FAFAF7"
			></div>
			<div
				class="h-12 w-12 rounded-lg"
				style="background: var(--color-foreground)"
				title="foreground #1A1A1A"
			></div>
			<div
				class="h-12 w-12 rounded-lg"
				style="background: var(--color-muted)"
				title="muted #6B6560"
			></div>
		</div>
	</section>

	<!-- Phase colors -->
	<section class="space-y-3">
		<h2 class="text-lg font-semibold">Phase Colors</h2>
		<div class="space-y-2">
			{#each phases as phase}
				<div class="flex items-center gap-3">
					<div
						class="h-4 w-full rounded-full phase-ribbon"
						style="background: {phase.color}"
					></div>
					<span class="w-32 shrink-0 text-sm text-[var(--color-muted)]">{phase.label}</span>
				</div>
			{/each}
		</div>
	</section>

	<!-- Type scale -->
	<section class="space-y-3">
		<h2 class="text-lg font-semibold">Type Scale (Inter)</h2>
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

	<!-- Arabic rendering — THE critical test -->
	<section class="space-y-4">
		<h2 class="text-lg font-semibold">Arabic Rendering (Amiri)</h2>
		<div
			class="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 space-y-4"
		>
			<div>
				<p class="mb-1 text-xs font-medium text-[var(--color-muted)] uppercase">
					xl — Niat Haji (hero card)
				</p>
				<ArabicText text={niatHaji} size="xl" />
				<p class="mt-1 text-sm italic text-[var(--color-muted)]">
					Labbaik Allahumma Hajjan
				</p>
			</div>
			<div>
				<p class="mb-1 text-xs font-medium text-[var(--color-muted)] uppercase">
					lg — Niat Umrah
				</p>
				<ArabicText text={niatUmrah} size="lg" />
				<p class="mt-1 text-sm italic text-[var(--color-muted)]">
					Labbaik Allahumma 'Umratan
				</p>
			</div>
			<div>
				<p class="mb-1 text-xs font-medium text-[var(--color-muted)] uppercase">
					base — Talbiyah (full)
				</p>
				<ArabicText text={talbiyah} size="base" />
				<p class="mt-1 text-sm text-[var(--color-muted)]">
					Labbaik Allahumma Labbaik, Labbaik laa syariika laka labbaik...
				</p>
			</div>
		</div>
	</section>

	<!-- Card press test -->
	<section class="space-y-3">
		<h2 class="text-lg font-semibold">Card Press Animation</h2>
		<div
			class="card-pressable rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5"
		>
			<p class="font-medium">Tap me — should scale to 0.98</p>
			<p class="mt-1 text-sm text-[var(--color-muted)]">100ms ease-out, no bounce</p>
		</div>
	</section>

	<!-- Dark mode toggle -->
	<section class="space-y-3">
		<h2 class="text-lg font-semibold">Dark Mode</h2>
		<button
			class="tap-target rounded-lg border border-[var(--color-border)] px-4 text-sm font-medium"
			onclick={() => {
				const html = document.documentElement;
				html.dataset.theme = html.dataset.theme === 'dark' ? 'light' : 'dark';
			}}
		>
			Toggle Dark Mode
		</button>
	</section>
</div>
