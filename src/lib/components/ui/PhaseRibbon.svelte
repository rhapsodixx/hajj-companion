<script lang="ts">
	interface Props {
		phase: string;
		label: string;
		class?: string;
	}

	let { phase, label, class: className = '' }: Props = $props();

	const phaseColors: Record<string, string> = {
		arrival: 'var(--color-phase-arrival)',
		madinah: 'var(--color-phase-madinah)',
		'madinah-to-makkah': 'var(--color-phase-madinah-to-makkah)',
		makkah: 'var(--color-phase-makkah)',
		'ash-shishah': 'var(--color-phase-ash-shishah)',
		rukun: 'var(--color-phase-rukun)',
		'post-hajj': 'var(--color-phase-post-hajj)',
		departure: 'var(--color-phase-departure)'
	};

	const color = $derived(phaseColors[phase] ?? 'var(--color-brand)');
</script>

<span
	class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold text-white tracking-wide phase-ribbon {className}"
	style="background: {color};"
>
	{label}
</span>
