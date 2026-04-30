<script lang="ts">
	import { Phone } from 'phosphor-svelte';
	interface Props {
		number: string;
		label?: string;
		class?: string;
	}

	let { number, label, class: className = '' }: Props = $props();

	const href = $derived(`tel:${number.replace(/\s/g, '')}`);
</script>

<a
	{href}
	class="tap-target inline-flex items-center gap-2 rounded-pill border border-border bg-surface px-4 text-sm font-medium text-foreground transition-transform duration-100 ease-out hover:bg-(--color-brand-light) active:scale-[0.98] {className}"
	aria-label="Telepon {label ?? number}"
>
	<Phone size={16} weight="regular" />
	<span>{label ?? number}</span>
</a>
