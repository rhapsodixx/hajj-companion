<script lang="ts">
	import { PHASE_COLORS } from '$lib/data/itinerary';

	interface Props {
		phase: string;
		label: string;
		class?: string;
	}

	let { phase, label, class: className = '' }: Props = $props();

	const color = $derived(PHASE_COLORS[phase] ?? 'var(--color-brand)');
</script>

<span
	class="phase-ribbon inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium tracking-wide {className}"
	style="border-color: {color}; color: {color};"
>
	{label}
</span>
