<script lang="ts">
	interface Props {
		phase: string;
		label: string;
		class?: string;
	}

	let { label, class: className = '' }: Props = $props();
</script>

<span
	class="inline-flex items-center rounded-pill bg-(--color-accent) px-2.5 py-0.5 text-xs font-medium tracking-wide text-foreground {className}"
>
	{label}
</span>
